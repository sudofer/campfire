import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import axios from "axios";
import Video from "./video/Video";
import Sidebar from "./sidebar";
import { io } from "socket.io-client";
import search from "youtube-search";
// import { sizing } from '@material-ui/system';
// import Container from '@material-ui/core/Container';
import "./Room.css";

export default function Room() {
  // const useStyles = makeStyles(theme => ({
  //   container: {
  //     height: '100%',
  //     width: '100%',
  //     display: 'flex',
  //     flexDirection: 'row',
  //     alignItems: 'flex-start',
  //     border: '1px solid black',
  //     borderRadius: '5px',
  //     textAlign: 'center',
  //   },
  //   videoPlayer: {
  //     width: '70%',
  //   },
  //   sideBarNav: {
  //     width: '30%',
  //   },
  //   img: {
  //     height: '65%',
  //     width: '65%',
  //   }
  // }));

  // const classes = useStyles();
  const history = useHistory();
  const [socket, setSocket] = useState(undefined);
  //State for user name & socket room url
  const [name, setName] = useState("");
  const [url, setURL] = useState("");

  //State for chat messages
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  //State for youtube api search
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //State for youtube playlist
  const [playList, setPlayList] = useState([]);

  //State for current playing video index
  const [currentPlaying, setCurrentPlaying] = useState(0);

  //Server location for socket connection
  const ENDPOINT = "ws://localhost:3002";

  //Initialize socket
  useEffect(() => {
    setSocket(io(ENDPOINT));
  }, []);

  //socket handlers
  useEffect(() => {
    // socket = io(ENDPOINT);
    if (socket) {
      const urlParams = new URLSearchParams(window.location.search);
      const userName = urlParams.get("name");
      const roomUrl = urlParams.get("url");

      setName(userName);
      setURL(roomUrl);

      socket.emit("CREATE_ROOM", { name: userName, url: roomUrl });

      socket.on("USER_ALREADY_EXIST", ({ error }) => {
        alert(error);
        console.log(error);
        history.push("/");
      });

      socket.on("MESSAGE", (message) => {
        setMessages((prev) => [...prev, message]);
      });

      socket.on("EXISTING_PLAY_LIST", (playList) => {
        setPlayList([...playList]);
      });

      socket.on("NEW_PLAY_LIST_ITEM", (playListItem) => {
        setPlayList((prev) => [...prev, playListItem]);
      });

      socket.on("PLAYLIST_CONTROLS", ({ type, nextPlayListIndex }) => {
        if (type === "upNext") {
          setCurrentPlaying(nextPlayListIndex);
        } else if (type === "chosenOne") {
          setCurrentPlaying(nextPlayListIndex);
        }
      })

      return () => {
        socket.disconnect();
      };
    }
  }, [socket, history]);

  //Function for sending message
  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("SEND_MESSAGE", { message, url });
      setMessage("");
    }
  };

  //Youtube search feature
  useEffect(() => {
    if (!searchTerm) return;
    const opts = {
      maxResults: 1,
      key: process.env.REACT_APP_KEY,
      part: "snippet",
    };

    search(searchTerm, opts, function (err, results) {
      if (err) return console.log(err);
      setResults(results);
    });
  }, [searchTerm]);

  //Add a search item to playlist
  const addPlayListItem = (playListItem) => {
    const { title, link, thumbnails, id } = playListItem;
    socket.emit("NEW_PLAY_LIST_ITEM", { url, title, link, thumbnails, id });
  };

  //Choose video from list
  const emitChosenOne = (index) => {
    console.log("IM THE CHOSEN ONE");
    console.log("aaa", index);
    socket.emit("PLAYLIST_CONTROLS", { url, type: "chosenOne", nextPlayListIndex: index });
  }

  return (
    <>
      <div className="container">
        <div className="video-player">
          {/* <img
            src="https://github.com/htkim94/campfire/blob/main/campfire-client/public/docs/yt_image.png?raw=true"
            alt="youtube screenshot"
          /> */}
          <Video
            socket={socket}
            playList={playList}
            setPlayList={setPlayList}
            url={url}
            currentPlaying={currentPlaying}
            setCurrentPlaying={setCurrentPlaying}
          />
        </div>

        <div className="sideBarNav">
          <Sidebar
            addPlayListItem={addPlayListItem}
            playList={playList}
            name={name}
            setPlayList={setPlayList}
            message={message}
            messages={messages}
            setMessage={setMessage}
            sendMessage={sendMessage}
            results={results}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setCurrentPlaying={setCurrentPlaying}
            emitChosenOne={emitChosenOne}
          />
        </div>
      </div>
    </>
  );
}
