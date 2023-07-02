const http = require("http");
const express = require("express");
const WebSocket = require("ws");

const app = express();
var myWs;

app.get("/", function (req, res) {
  res.status(200).send("Hello World!");
});

app.post("/hooks/payment_success", function (req, res) {
  console.log("Payment success");
  if (myWs) {
    myWs.send("Payment success");
  }
  res.status(200).send("Payment success");
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

server.listen(process.env.port || 1337, function () {
  console.log("Server running");
});

wss.on("connection", function (ws) {
  console.log("new connection");
  myWs = ws;
});
