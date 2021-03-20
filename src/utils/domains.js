module.exports = {
  broadcastData: (wss, data) => {
    wss.clients.forEach((client) => {
      client.send(JSON.stringify(data));
    });
  },
};
