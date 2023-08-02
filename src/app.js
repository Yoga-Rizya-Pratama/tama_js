const express = require("express");
require("dotenv").config();
const createHttpError = require("http-errors");
const cors = require("cors");
const mainRouter = require("./routes/main.router");
const morgan = require("morgan");
/**
 * uncomment this import if you want to handle file
 * const FILE = require('./utils/file.util')
 * const path = require('path');
 */

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/**
 * if you want to handle file, uncomment this code, you can change setting inside file.util.js
 * app.use(FILE.upload.single("image"));
 * app.use("/image", express.static(path.join(__dirname, "images")));
 */

app.use("/", mainRouter);

app.use((req, res, next) => {
  next(new createHttpError.NotFound());
});

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
};

app.use(errorHandler);

const port = process.env.PORT || 3000;

module.exports = server = app.listen(port, () => {
  console.log(
    `api is running on port http://localhost:${port} you are good to go!!!`
  );
});
