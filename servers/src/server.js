const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");
const { getPlanetsData } = require("./models/planets-model");
const { planet } = require("./models/planets-model");

const PORT = process.env.PORT || 8000;
const MONGO_URL =
  "mongodb+srv://Ejiro765:meatpie3@cluster0.n53goag.mongodb.net/nasa?retryWrites=true&w=majority";

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("Connection succesful");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

async function startServer() {
  await getPlanetsData();

  await mongoose.connect(MONGO_URL);

  server.listen(PORT, () => {
    console.log(`We have ${planet.length} planets`);
  });
}

startServer();
