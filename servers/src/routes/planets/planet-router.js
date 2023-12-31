const express = require("express");
const getPlanetsData = require("../planets/planet-controller");

const planetRouter = express.Router();

planetRouter.get("/", getPlanetsData);

module.exports = planetRouter;
