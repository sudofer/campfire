const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const PORT = 3002;

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});