"use strict";

const express = require("express");
const { Server } = require("ws");

const PORT = process.env.PORT || 9000;
// const INDEX = "/index.html";
const { list_covid19_all_country } = require("./src/domains/index");
const { broadcastData } = require("./src/utils/domains");

// const server = express()
//   .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
//   .listen(PORT, () => console.log(`Listening on ${PORT}`));

const server = express()
  .use((req, res) => res.sendFile({ root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.on("close", () => console.log("Client disconnected"));
});

const country = [
  "USA",
  "Spain",
  "Italy",
  "Germany",
  "France",
  "UK",
  "Russia",
  "Belgium",
  "Netherlands",
  "Brazil",
];
let lastdays = 1;

setInterval(async () => {
  const resp = await list_covid19_all_country(country, lastdays);
  broadcastData(wss, resp);
  lastdays = lastdays + 1;
  if (lastdays > 30) {
    lastdays = 1;
  }
  // wss.clients.forEach((client) => {
  //   client.send(new Date().toTimeString());
  // });
}, 1000);
