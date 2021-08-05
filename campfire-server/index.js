const express = require("express");
const app = express();

const {
  addUser,
  removeUser,
  getUser,
  getUserInRoom,
  getUsersInRoom,
} = require("./users");

const users = [];

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
  socket.on("createRoom", ({ name, url }, callback) => {
    console.log(`user id ${socket.id} joined room ${url}!`);
    const { error, user } = addUser(users, { id: socket.id, name, url });

    console.log(users);

    if (error) return callback(error);

    console.log(`about to emit message to ${socket.id}`);
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.url}!`,
    });
    socket.broadcast
      .to(url)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    socket.join(url);

    // io.to(user.url).emit("roomData", {
    //   room: user.url,
    //   users: getUsersInRoom(user.room),
    // });

    // callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(users, socket.id);
    io.to(user.url).emit("message", { user: user.name, text: message });
    // io.to(user.url).emit("roomData", {
    //   room: user.name,
    //   users: getUsersInRoom(user.room),
    // });
    callback();
  });

  socket.on("NEW_PLAY_LIST_ITEM", (item) => {
    io.in(url).emit("NEW_PLAY_LIST_ITEM", item);
    console.log(item);
  });

  socket.on("VIDEO_CONTROLS", (control) => {
    const user = getUser(users, socket.id);
    console.log("_______*_____", control);
    io.in(user.url).emit("VIDEO_CONTROLS", control);
  });

  socket.on("disconnect", () => {
    const user = getUser(users, socket.id);

    if (user) {
      io.to(user.url).emit("message", {
        user: "admin",
        text: `${user.name} has left the room.`,
      });

      removeUser(users, socket.id);

      socket.leave(user.url);
    }

    console.log("socket has disconnected!!");
  });
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
