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
      });
      socket.join(url);
      adminChatWelcome(socket, name);
    } else {
      const roomIndex = getRoomIndex(data, url);
      if (checkExistingUser(data[roomIndex].users, trimmedName) === false) {
        data[roomIndex].users.push(user);
        socket.join(url);
        adminChatWelcome(socket, name);
        adminChatJoin(socket, url, name);
        socket.emit("EXISTING_PLAY_LIST", data[roomIndex].playList);
      } else {
        socket.emit("USER_ALREADY_EXIST", { error: "USERNAME ALREADY EXIST" });
      }
    }
    console.log(data);
  });

  socket.on("SEND_MESSAGE", ({ message, url }) => {
    const room = getRoomByUrl(data, url);
    const user = getUser(room.users, socket.id);
    io.to(room.url).emit("MESSAGE", { user: user.name, text: message });
    // io.to(user.url).emit("roomData", {
    //   room: user.name,
    //   users: getUsersInRoom(user.room),
    // });
    // callback();
  });

  socket.on("NEW_PLAY_LIST_ITEM", ({ url, title, link, thumbnails, id }) => {
    const roomIndex = getRoomIndex(data, url);
    const playListItem = { title, link, thumbnails, id };
    data[roomIndex].playList.push(playListItem);
    io.in(url).emit("NEW_PLAY_LIST_ITEM", playListItem);
  });

  socket.on("PLAYLIST_CONTROLS", ({ url, type, nextPlayListIndex }) => {
    if (type === "upNext") {
      io.in(url).emit("PLAYLIST_CONTROLS", { type, nextPlayListIndex })
    } else if (type === "chosenOne") {
      console.log(nextPlayListIndex);
      io.in(url).emit("PLAYLIST_CONTROLS", { type, nextPlayListIndex })
    }
  })

  socket.on("VIDEO_CONTROLS", ({url, type, time}) => {
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
