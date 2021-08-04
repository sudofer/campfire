const express = require("express");
// const users = require("./routes/users");
const cors = require("cors");
const socketio = require("socket.io");
const app = express();
app.use(cors());
// app.use("/users", users);

const { addUser, removeUser, getUser, getUserInRoom} = require('./users');

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
  console.log(`socket connection alive on id ${socket.id}`)
  socket.on("createRoom", ({ name, url }, callback) => {
    console.log(`user id ${socket.id} joined room ${url}!`);
    const { error, user } = addUser({ id: socket.id, name, url });

    if(error) return callback(error);

    console.log(`about to emit message to ${socket.id}`)
    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.url}!` })
    socket.broadcast.to(user.url).emit('message', { user: 'admin', text: `${user.name} has joined!` })

    socket.join(user.url);

    // callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.url).emit('message', { user: user.name, text: message});
    callback();
  })

  
  socket.on("disconnect", () => {
    console.log("user has disconnected!!")
  })

  socket.on("NEW_PLAY_LIST_ITEM", (item) => {
    io.to(user.url).emit(item);

  });
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
