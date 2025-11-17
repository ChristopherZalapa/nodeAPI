import http from "node:http";
import data from "./Data/data.js";
import sendJsonResponse from "./Utilities/sendJsonResponse.js";
import getDataByPathParams from "./Utilities/getDataByPathParams.js";
import getDataByQueryParams from "./Utilities/getDataByQueryParams.js";

const PORT = 8000;

const server = http.createServer((req, res) => {
	try {
		const destinations = data;

		const urlObj = new URL(req.url, `http://${req.headers.host}`);

		const queryObj = Object.fromEntries(urlObj.searchParams);

		if (urlObj.pathname === "/api" && req.method === "GET") {
			let filteredData = getDataByQueryParams(destinations, queryObj);

			sendJsonResponse(res, 200, filteredData);
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
			const filteredData = getDataByPathParams(
				destinations,
				"country",
				country,
			);
			sendJsonResponse(res, 200, filteredData);
		}
	} catch (error) {
		res.setHeader("Content-Type", "application/json");
		sendJsonResponse(res, 404, {
			error: "not found",
			message: "The requested route does not exist",
		});
	}
});

server.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
