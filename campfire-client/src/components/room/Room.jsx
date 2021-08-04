import React, { useState, useEffect } from "react";
// import axios from "axios";
import SideBarNav from "./sidebar";
import { io } from "socket.io-client";
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
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3002/users")
  //     .then((users) => setUsers([...users.data]));

  //   socket = io("ws://localhost:3002");
  //   socket.on("joinedRoom", () => {
  //     console.log("successfully joined room");
  //   });
  // }, []);

  const addPlayListItem = (item) => {
    socket.emit("NEW_PLAY_LIST_ITEM", item);
  };

  return (
    <>
      <div className="container">
        <div className="video-player">
          <img
            src="https://github.com/htkim94/campfire/blob/main/campfire-client/public/docs/yt_image.png?raw=true"
            alt="youtube screenshot"
          />
        </div>

        <div className="sideBarNav">
          <SideBarNav addPlayListItem={addPlayListItem} />
        </div>
      </div>
    </>
  );
}
