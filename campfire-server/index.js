const express = require("express");
const app = express();

const {
  adminChatJoin,
  adminChatWelcome,
  checkExistingUser,
  removeUser,
  getUser,
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
          currentPlaying: null,
        });
      } else {
        socket.emit("USER_ALREADY_EXIST", { error: "USERNAME ALREADY EXIST" });
      }
    }
  });

  socket.on("SEND_MESSAGE", ({ message, url }) => {
    const room = getRoomByUrl(data, url);
    const user = getUser(room.users, socket.id);
    io.to(room.url).emit("MESSAGE", {
      user: user.name,
      text: message,
    });
  });

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
      data[roomIndex].playList.splice(index, 1);
      io.in(url).emit("PLAYLIST_CONTROLS", {
        type,
        index: null,
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
  });
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
