export default function sendJsonResponse(res, statusCode, payload) {
	res.setHeader("Content-Type", "application/json");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Origin", "GET");
	res.statusCode = statusCode;
	res.end(JSON.stringify(payload));
}
