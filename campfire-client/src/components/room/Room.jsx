import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import axios from "axios";
import Video from "./video/Video";
import Sidebar from "./sidebar";
import { io } from "socket.io-client";
import search from "youtube-search";
import LinkIcon from "@material-ui/icons/Link";
import MusicVideoIcon from "@material-ui/icons/MusicVideo";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import "./Room.css";

export default function Room() {
  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#ffffff",
      },
    },
  });

  //State for users in a room
  const [roomUsers, setRoomUsers] = useState([]);
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
  const [currentPlaying, setCurrentPlaying] = useState(null);

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
        history.push("/");
      });

      socket.on("MESSAGE", (message) => {
        setMessages((prev) => [...prev, message]);
      });

      socket.on("EXISTING_PLAY_LIST", ({ playList, currentPlaying }) => {
        setCurrentPlaying(currentPlaying);
        setPlayList([...playList]);
      });

      socket.on("NEW_PLAY_LIST_ITEM", (playListItem) => {
        setPlayList((prev) => [...prev, playListItem]);
      });

      socket.on("ADD_USER_DATA", ({ users }) => {
        setRoomUsers([...users]);
      });

      socket.on("DELETE_USER_DATA", ({ users }) => {
        setRoomUsers([...users]);
      });

      socket.on("PLAYLIST_CONTROLS", ({ type, index, newPlayList }) => {
        if (type === "upNext") {
          setCurrentPlaying(index);
        } else if (type === "chosenOne") {
          setCurrentPlaying(index);
        } else if (type === "DELETE_ITEM") {
          setCurrentPlaying(index);
          setPlayList([...newPlayList]);
        }
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [socket]);

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

  //Remove item from playlist
  const removeFromPlayList = (index) => {
    socket.emit("PLAYLIST_CONTROLS", {
      url,
      type: "DELETE_ITEM",
      index,
    });
  };

  //Choose video from list
  const emitChosenOne = (index) => {
    socket.emit("PLAYLIST_CONTROLS", {
      url,
      type: "chosenOne",
      index,
    });
  };

  return (
    <>
      <ThemeProvider theme={darkTheme} />

      <div className="container">
        <div className="video-player">
          <Video
            socket={socket}
            playList={playList}
            url={url}
            currentPlaying={currentPlaying}
            setCurrentPlaying={setCurrentPlaying}
          />
        </div>

        <div className="sideBarContainer">
          <div className="usersInRoomContainer">
            <div className="inviteTitle">
              {/* <div>
                <HomeIcon className="userIcon"/>
                <span className="MuiTab-root">
                Users
                </span>
              </div> */}
              <div>
                <LinkIcon className="userIcon" />
                <span className="MuiTab-root">Invite</span>
              </div>
            </div>
            {/* <div className="usersInRoomList">
            {roomUsers.length !== 0 &&
              roomUsers.map((user) => <li>{user.name}</li> )}
            </div>*/}
          </div>

          <div className="nowPlayingSection">
            <MusicVideoIcon className="userIcon" />
            {currentPlaying !== null ? (
              <>
                <span className="MuiTab-root">Now Playing</span>
                <span className="nowPlayingVideoTitle">
                  {playList[currentPlaying].title}
                </span>{" "}
              </>
            ) : (
              <span></span>
            )}
          </div>
          <Sidebar
            className="sideBar"
            addPlayListItem={addPlayListItem}
            playList={playList}
            name={name}
            message={message}
            messages={messages}
            setMessage={setMessage}
            sendMessage={sendMessage}
            results={results}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setCurrentPlaying={setCurrentPlaying}
            emitChosenOne={emitChosenOne}
            removeFromPlayList={removeFromPlayList}
            roomUsers={roomUsers}
          />
        </div>
      </div>
    </>
  );
}
