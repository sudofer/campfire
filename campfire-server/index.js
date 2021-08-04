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
  console.log("user connected!");

  socket.on("createRoom", ({ url, name }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, url });

    if(error) return callback(error);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}!` })
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` })

    socket.join(user.room);

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message});

    callback();
  })

  
  socket.on("disconnect", () => {
    console.log("user has disconnected!!")
  })

  socket.on("NEW_PLAY_LIST_ITEM", (item) => {
    io.to(roomID).emit(item);

  });
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
