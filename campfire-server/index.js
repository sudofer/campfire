const express = require("express");
const app = express();

const {
  adminChatJoin,
  adminChatWelcome,
  checkExistingUser,
  removeUser,
  getUser,
  getUsersInRoom,
  getRoomById,
  getRoomByUrl,
  getRoomIndex,
  removeRoom,
} = require("./users");

// we want data to have array of objects with roomUrl, users(array), playlist(array)
const data = [];

const PORT = process.env.PORT || 3002;

const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`socket connection alive on id ${socket.id}`);

  socket.on("CREATE_ROOM", ({ name, url }) => {
    const trimmedName = name.trim().toLowerCase();
    const user = { id: socket.id, name: trimmedName };

    if (!getRoomByUrl(data, url)) {
      data.push({
        url,
        users: [user],
        playList: [],
        currentPlaying: null,
      });
      socket.join(url);
      const room = getRoomByUrl(data, url);
      io.in(url).emit("ADD_USER_DATA", { users: room.users });
      adminChatWelcome(socket, name);
    } else {
      const roomIndex = getRoomIndex(data, url);
      if (checkExistingUser(data[roomIndex].users, trimmedName) === false) {
        data[roomIndex].users.push(user);
        socket.join(url);
        const room = getRoomByUrl(data, url);
        io.in(url).emit("ADD_USER_DATA", { users: room.users });
        adminChatWelcome(socket, name);
        adminChatJoin(socket, url, name);
        socket.emit("EXISTING_PLAY_LIST", {
          playList: data[roomIndex].playList,
          currentPlaying: data[roomIndex].currentPlaying,
        });
      } else {
        socket.emit("USER_ALREADY_EXIST", { error: "USERNAME ALREADY EXIST" });
      }
    }
    console.log(data);
  });

  socket.on("SEND_MESSAGE", ({ message, url }) => {
    const room = getRoomByUrl(data, url);
    const user = getUser(room.users, socket.id);
    io.to(room.url).emit("MESSAGE", {
      user: user.name,
      text: message,
    });
    // io.to(user.url).emit("roomData", {
    //   room: user.name,
    //   users: getUsersInRoom(user.room),
    // });
    // callback();
  });

  //Send User Data
  // let roomURL;
  // socket.on("DATA", ({ url }) => {
  //   const room = getRoomByUrl(data, url);
  //   const user = getUser(room.users, socket.id);
  //   io.to(room.url).emit("DATA", { users: getUsersInRoom(user.room) });
  // });

  // const sendUserDataToRoom = (url) => {};
  // sendUserDataToRoom(roomURL);

  socket.on("NEW_PLAY_LIST_ITEM", ({ url, title, link, thumbnails, id }) => {
    const roomIndex = getRoomIndex(data, url);
    const playListItem = { title, link, thumbnails, id };
    data[roomIndex].playList.push(playListItem);
    io.in(url).emit("NEW_PLAY_LIST_ITEM", playListItem);
  });

  socket.on("PLAYLIST_CONTROLS", ({ url, type, index }) => {
    const roomIndex = getRoomIndex(data, url);
    if (type === "upNext") {
      data[roomIndex].currentPlaying = index;
      io.in(url).emit("PLAYLIST_CONTROLS", { type, index });
    } else if (type === "chosenOne") {
      data[roomIndex].currentPlaying = index;
      io.in(url).emit("PLAYLIST_CONTROLS", { type, index });
    } else if (type === "DELETE_ITEM") {
      console.log("server got delete item message");
      data[roomIndex].playList.splice(index, 1);
      const currentPlaying = data[roomIndex].currentPlaying;
      if (!data[roomIndex].playList[currentPlaying]) {
        data[roomIndex].currentPlaying--;
      }
      console.log(data[roomIndex].playList, "PLAYLIST PLAYLIST");
      io.in(url).emit("PLAYLIST_CONTROLS", {
        type,
        index: data[roomIndex].currentPlaying,
        newPlayList: data[roomIndex].playList,
      });
    }
  });

  socket.on("VIDEO_CONTROLS", ({ url, type, time }) => {
    io.in(url).emit("VIDEO_CONTROLS", { type, time });
  });

  socket.on("disconnect", () => {
    const room = getRoomById(data, socket.id);

    if (room) {
      const url = room.url;
      const roomIndex = getRoomIndex(data, url);

      if (room.users.length === 1) {
        removeRoom(data, roomIndex);
      } else {
        const user = getUser(room.users, socket.id);
        if (user) {
          io.to(room.url).emit("MESSAGE", {
            user: "admin",
            text: `${user.name} has left the room.`,
          });
        }
        removeUser(data[roomIndex].users, socket.id);
        io.in(data[roomIndex].url).emit("DELETE_USER_DATA", {
          users: data[roomIndex].users,
        });
      }

      socket.leave(room.url);
    }
    console.log(data);
    console.log("socket has disconnected!!");
  });
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
