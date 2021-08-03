import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { Button } from "@material-ui/core";

let socket;

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/users")
      .then((users) => setUsers([...users.data]));

    socket = io("ws://localhost:3002");
    socket.on("joinedRoom", () => {
      console.log("successfully joined room");
    });
  }, []);

  const ID = function () {
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  return (
    <>
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user.id}>{user.username}</div>
      ))}

      <Button
        color="secondary"
        onClick={() => {
          const roomID = ID();
          console.log(roomID);
          socket.emit("createRoom", { roomID });
        }}
      >
        Create room
      </Button>
    </>
  );
}
