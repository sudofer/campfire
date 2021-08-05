import React, { useState, useEffect } from "react";
// import axios from "axios";
import Video from "./video/Video";
import Sidebar from "./sidebar";
import { io } from "socket.io-client";
import search from "youtube-search";
// import { sizing } from '@material-ui/system';
// import Container from '@material-ui/core/Container';
import "./Room.css";
let socket;
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

  //Server location for socket connection
  const ENDPOINT = "ws://localhost:3002";

  //Initialize socket and create Room
  useEffect(() => {
    socket = io(ENDPOINT);

    const urlParams = new URLSearchParams(window.location.search);
    const userName = urlParams.get("name");
    const roomUrl = urlParams.get("url");

    setName(userName);
    setURL(roomUrl);

    socket.emit("createRoom", { name: userName, url: roomUrl }, (error) => {
      console.log(error);
    });

    socket.on("message", (message) => {
      setMessages(prev => [...prev, message]);
    });

    socket.on("NEW_PLAY_LIST_ITEM", (playListItem) => {
      setPlayList(prev => [...prev, playListItem]);
    });

    return() => {
      socket.disconnect();
    };
  }, []);

  //Receive messages from server and trigger setMessages
  // useEffect(() => {
  //   socket.on("message", (message) => {
  //     setMessages([...messages, message]);
  //   });
  // }, []);

  //Function for sending message
  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      // socket.emit("sendMessage", message, () => setMessage(""));
      socket.emit("sendMessage", message);
      setMessage("");
    }
  };

  // console.log(message, messages);

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
    
    socket.emit("NEW_PLAY_LIST_ITEM", {title, link, thumbnails, id});
  };

  // Receive Playlist Item
  // useEffect(() => {
  //   socket.on("NEW_PLAY_LIST_ITEM", (playListItem) => {
  //     setPlayList(prev => [...prev, playListItem]);
  //   })
  // }, [playList]);


  return (
    <>
      <div className="container">
        <div className="video-player">
          {/* <img
            src="https://github.com/htkim94/campfire/blob/main/campfire-client/public/docs/yt_image.png?raw=true"
            alt="youtube screenshot"
          /> */}
          <Video socket={socket} />
        </div>

        <div className="sideBarNav">
          <Sidebar
            addPlayListItem={addPlayListItem}
            playList={playList}
            name={name}
            // url={url}
            message={message}
            messages={messages}
            setMessage={setMessage}
            sendMessage={sendMessage}
            results={results}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </div>
    </>
  );
}
