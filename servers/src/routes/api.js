const planetRouter = require("../routes/planets/planet-router");
const launchesRouter = require("../routes/launches/launches-router");
const express = require("express");

const api = express.Router();

api.use("/planets", planetRouter);
api.use("/launches", launchesRouter);

module.exports = api;
