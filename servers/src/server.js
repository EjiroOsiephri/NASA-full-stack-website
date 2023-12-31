const http = require("http");
const app = require("./app");
const { mongoConnection } = require("./services/mongo");
const { getPlanetsData } = require("./models/planets-model");
const { planet } = require("./models/planets-model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnection();
  await getPlanetsData();

  server.listen(PORT, () => {
    console.log(`We have ${planet.length} planets`);
  });
}

startServer();
