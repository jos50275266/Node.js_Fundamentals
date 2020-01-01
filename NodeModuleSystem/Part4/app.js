// HTTP Module which inherits event module
const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello World!");
    res.end();
  }

  if (req.url === "/api") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

// server.on("connection", socket => {
//   // connection: Docs 에서 찾을 수 있음
//   console.log("New Connection...");
// });

server.listen(3000);

console.log("Listening on port 3000...");
