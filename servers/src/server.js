const app = require("./app");
const https = require("https");

const PORT = process.env.PORT || 8000;
const server = https.createServer(app);

server.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`);
});
