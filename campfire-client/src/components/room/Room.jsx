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

  const [name, setName] = useState("");
  const [url, setURL] = useState("");
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "ws://localhost:3002";

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");
    const roomUrl = urlParams.get("url");

    socket = io(ENDPOINT);

    setName(name);
    setURL(roomUrl);

    socket.emit("createRoom", { name, url }, ({ error }) => {});

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT, window.location.search]);

  useEffect(() => {
    console.log(`client side: ${socket.id}`);
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  console.log(message, messages);

  const addPlayListItem = (item) => {
    socket.emit("NEW_PLAY_LIST_ITEM", item);
  };

  //***********************SearchBox State
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const submitPlayListItem = (playListItem) => {
    console.log(playListItem);
    addPlayListItem(playListItem);
  };

  useEffect(() => {
    if (!searchTerm) return;
    var opts = {
      maxResults: 10,
      key: process.env.REACT_APP_KEY,
      part: "snippet",
    };

    search(searchTerm, opts, function (err, results) {
      if (err) return console.log(err);

      setResults(results);
    });
  }, [searchTerm]);

  //**********************************SearchBox State

  return (
    <>
      <div className="container">
        <div className="video-player">
          {/* <img
            src="https://github.com/htkim94/campfire/blob/main/campfire-client/public/docs/yt_image.png?raw=true"
            alt="youtube screenshot"
          /> */}
          <Video />
        </div>

        <div className="sideBarNav">
          <Sidebar
            addPlayListItem={addPlayListItem}
            name={name}
            message={message}
            messages={messages}
            setMessage={setMessage}
            sendMessage={sendMessage}
            results={results}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            submitPlayListItem={submitPlayListItem}
          />
        </div>
      </div>
    </>
  );
}
