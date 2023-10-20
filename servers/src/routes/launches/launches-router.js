const express = require("express");
const {
  httpGetAllLaunches,
  httpAddNewLaunches,
} = require("../launches/launches-controller");

const launchesRouter = express.Router();

launchesRouter.get("/launches", httpGetAllLaunches);
launchesRouter.post("/launches", httpAddNewLaunches);

module.exports = launchesRouter;
