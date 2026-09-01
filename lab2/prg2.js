import { mkdir, rm } from "fs/promises";

// await mkdir("uploads");
// await mkdir("uploads/images");

// await mkdir("docs/resumes/data", { recursive: true });

// removes only data folder
// await rm("docs/resumes/data", { recursive: true });

// removes main folder and sub folder also
await rm("docs", { recursive: true });
import http from "http";
import { readFile } from "fs/promises";

const server = http.createServer(async (req, res) => {
  res.write("Loading....");
  const text = await readFile("big.txt");
  res.end(text);
});

server.listen(3000, () => console.log("Server is running..."));