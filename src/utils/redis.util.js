const redis = require("redis");

const client = redis.createClient({
  socket: {
    host: "localhost",
    port: "6379",
  },
});

client.connect();
client.on("error", (err) => console.log("Redis Server Error", err));

module.exports = client;
