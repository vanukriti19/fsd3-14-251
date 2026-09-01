import http from "http";

const server = http.createServer((req, res) => {
  console.log("req.url:", req.url);

  if (req.url === "/product") res.end("<h1>Product Page</h1>");
  else if (req.url === "/cart") res.end("<h1>Cart Page</h1>");
  else if (req.url === "/checkout") res.end("<h1>Checkout Page</h1>");
  else res.end("404, Page not found");
});

server.listen(3000, () => console.log("Server is running..."));
