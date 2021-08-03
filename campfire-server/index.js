const express = require("express");
const users = require("./routes/users");
const cors = require("cors");
const socketio = require("socket.io");
const app = express();
app.use(cors());
app.use("/users", users);

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
  console.log("back end connected");
  socket.send("hello");

  socket.on("createRoom", ({ url, name }) => {
    console.log(url, name);
    socket.join(url);
    io.to(url).emit(`${name} has joinedRoom`);
  });

  socket.on("NEW_PLAY_LIST_ITEM", (item) => {
    io.to(roomID).emit(item);
  });
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
