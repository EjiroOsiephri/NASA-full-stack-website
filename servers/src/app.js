const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const api = require("./routes/api");

const app = express();

//middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "https://ejiro-nasa-project.netlify.app"],
  })
);

app.use(express.json());
app.use(morgan("combined"));

app.use('/', (req,res)=>{
  res.json({message: "Welcome to nasa"})
})

app.use("/v1", api);

// app.use(express.static(path.join(__dirname, "..", "public")));

// app.get("/*", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "..", "public", "index.html")
//   );
// });

module.exports = app;
