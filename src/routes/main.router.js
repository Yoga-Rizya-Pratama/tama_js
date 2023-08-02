const express = require("express");
const apiRouter = require("./api.route");
// import your own routes
const usersRouter = require("./example/users.route");

const mainRouter = express.Router();

mainRouter.use(apiRouter);
// You can write mainRouter.use(router)
mainRouter.use(usersRouter);

module.exports = mainRouter;
