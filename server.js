import http from "node:http";
import data from "./Data/data.js";
import sendJsonResponse from "./Utilities/sendJsonResponse.js";
import getDataByPathParams from "./Utilities/getDataByPathParams.js";

const PORT = 8000;

const server = http.createServer((req, res) => {
	const destinations = data;

	if (req.url === "/api" && req.method === "GET") {
		sendJsonResponse(res, 200, destinations);
	} else if (req.url.startsWith("/api/continent") && req.method === "GET") {
		const continent = req.url.split("/").pop();
		const filteredData = getDataByPathParams(
			destinations,
			"continent",
			continent,
		);
		sendJsonResponse(res, 200, filteredData);
	} else if (req.url.startsWith("/api/country") && req.method === "GET") {
		const country = req.url.split("/").pop();
		const filteredData = getDataByPathParams(destinations, "country", country);
		sendJsonResponse(res, 200, filteredData);
	} else {
		res.setHeader("Content-Type", "application/json");
		sendJsonResponse(res, 404, {
			error: "not found",
			message: "The requested route does not exist",
		});
	}
});

server.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
