const http = require("http");
const express = require("express");
const WebSocket = require("ws");

const app = express();
const cors = require("cors");
var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
var myWs;

app.get("/", function (req, res) {
  res.status(200).send("Hello World!");
});

app.post("/hooks/payment_success", function (req, res) {
  console.log("Payment success");
  if (myWs) {
    myWs.send("Payment success");
  }
  res.status(200).json({
    status: 200,
    body: { message: "ok" },
  });
});

app.post("/hooks/payment_failure", function (req, res) {
  console.log("Payment failure");
  if (myWs) {
    myWs.send("Payment failure");
  }
  res.status(200).json({
    status: 200,
    body: { message: "ok" },
  });
});

app.get("/hooks/payment_success", function (req, res) {
  res.status(200).json({
    //first is dev key, second is prod key
    // key: "F346EB518238430EAA4615ACAA93CCAE42BCE2B0",
    key: "378EAB5A490F2D3A3B258BE57D9447ECF0976017",
  });
});

app.get("/hooks/payment_failure", function (req, res) {
  res.status(200).json({
    //first is dev key, second is prod key
    // key: "F346EB518238430EAA4615ACAA93CCAE42BCE2B0",
    key: "378EAB5A490F2D3A3B258BE57D9447ECF0976017",
  });
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
