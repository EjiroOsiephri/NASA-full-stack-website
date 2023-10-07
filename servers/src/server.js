const app = require("./app");
const http = require("http");
const { getPlanetsData } = require("./models/planets-model");

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function startServer() {
  await getPlanetsData();
  server.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`);
  });
}

startServer();
