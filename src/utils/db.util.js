const mongoose = require("mongoose");
require("dotenv").config();
const connectionString = process.env.DB_URI; // Replace with your MongoDB connection string

mongoose.connect(connectionString);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to the database.");
});

module.exports = mongoose;
