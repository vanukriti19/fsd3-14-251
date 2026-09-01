import http from "http";

const server = http.createServer((req, res) => {
  //   res.writeHead(500, {
  //     "content-type": "text/html",
  //   });

  res.end("<h1>Welcome to Server</h1>");
});

server.listen(4444, () => console.log("Server is running"));
