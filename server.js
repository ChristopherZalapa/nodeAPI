import http from "node:http";

const PORT = 8000;

const server = http.createServer((req, res) => {
	res.end("Hello from the sever!");
});

server.listen(PORT, () => console.log(`Sever running on port: ${PORT}`));
