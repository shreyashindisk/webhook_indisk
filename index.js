const http = require("http");
const express = require("express");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

server.listen(1337, function () {
  console.log("Server running");
});

wss.on("connection", function (ws) {
  console.log("new connection");
});
