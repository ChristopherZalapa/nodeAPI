import http from "node:http";
import data from "./Data/data.js";
import sendJsonResponse from "./Utilities/sendJsonResponse.js";

const PORT = 8000;

const server = http.createServer((req, res) => {
	const destinations = data;

	if (req.url === "/api" && req.method === "GET") {
		sendJsonResponse(res, 200, destinations);
	} else if (req.url.startsWith("/api/continent") && req.method === "GET") {
		const continent = req.url.split("/").pop();

		const filteredData = destinations.filter((destination) => {
			return destination.continent.toUpperCase() === continent.toUpperCase();
		});

		sendJsonResponse(res, 200, filteredData);
	} else if (req.url.startsWith("/api/country") && req.method === "GET") {
		const country = req.url.split("/").pop();

		const filteredData = destinations.filter((destination) => {
			return destination.country.toUpperCase() === country.toUpperCase();
		});

		sendJsonResponse(res, 200, filteredData);
	} else {
		sendJsonResponse(res, 404, {
			error: "Not found",
			msg: "The request route does not eist",
		});
	}
});

server.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
