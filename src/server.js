import http from "node:http";
import { list, load } from "./loader.js";
import { getUrlFirstPortion } from "./utils.js";

const server = http.createServer((request, response) => {
	if (request.method == "GET") {
		if (request.url == "/") {
			return response.end(JSON.stringify(list()));
		}
		const card = getUrlFirstPortion(request.url);
		const payload = load(card);
		return response.end(JSON.stringify(payload));
	}
	return response.end("Olá Mundo!");
});

server.listen(3333);
