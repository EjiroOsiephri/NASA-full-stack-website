const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://Ejiro765:meatpie3@cluster0.n53goag.mongodb.net/nasa?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
  console.log("Connection succesful");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

async function mongoConnection() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnection,
  mongoDisconnect,
};
