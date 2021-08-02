const express = require('express');
const users = require ('./routes/users');
var cors = require('cors');
const app = express();
app.use(cors());
app.use('/users', users)
const http = require('http');
const server = http.createServer(app);

const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });

wss.on("connection", socket => {
  console.log("back end connected")
  socket.send('hello');
  socket.onmessage = event => {
    console.log(`Message Received: ${event.data}`);

    if (event.data === "ping") {
      socket.send(JSON.stringify("pong"));
    }
  };
});

const PORT = 3002;

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});





