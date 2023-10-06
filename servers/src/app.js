const planetRouter = require("./routes/planets/planet-router");
const express = require("express");

const app = express();

//middleware
app.use(express.json());
app.use(planetRouter);

module.exports = app;
