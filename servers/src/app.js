const express = require("express");
const cors = require("cors");
const path = require("path");
const planetRouter = require("./routes/planets/planet-router");
const launchesRouter = require("./routes/launches/launches-router");
const morgan = require("morgan");

const app = express();

//middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://ejiro-nasa-project.netlify.app/",
    ],
  })
);

app.use(express.json());
app.use(morgan("combined"));

// app.use(express.static(path.join(__dirname, "..", "public")));

// app.get("/*", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "..", "public", "index.html")
//   );
// });

app.use(planetRouter);
app.use("/launches", launchesRouter);

module.exports = app;
