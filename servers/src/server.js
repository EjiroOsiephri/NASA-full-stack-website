const http = require("http");
const app = require("./app");
const { getPlanetsData } = require("./models/planets-model");
const {planet} = require('./models/planets-model')

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function startServer() {
  await getPlanetsData();
  server.listen(PORT, () => {
    console.log(planet);
  });
}

startServer();
