const app = require("./app");
const http = require("http");

const promise = new Promise((resolve, reject) => {
  resolve(56);
});

promise.then((result) => {
  console.log(result);
});

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`);
});
