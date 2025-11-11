import http from "node:http";
import data from "./Data/data.js";

const PORT = 8000;

const server = http.createServer((req, res) => {
	if (req.url === "/api" && req.method === "GET") {
		res.end("Hello from the server");
	}
});

const destinations = data;

console.log(destinations);

server.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
