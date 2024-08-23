import http from "node:http";
import { list, load, page } from "./loader.js";
import { getResourcePage, getUrlFirstPortion } from "./utils.js";

const server = http.createServer((request, response) => {
	if (request.method == "GET") {
		const path = getUrlFirstPortion(request.url);
		const resource = getResourcePage(path);
		if (resource !== null) {
			response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
			return response.end(page(resource.name, resource.version));
		}
		const payload = load(path);
		response.writeHead(200, { "Content-Type": "application/json" });
		// TODO: limitar o acesso a lista
		return payload !== null
			? response.end(JSON.stringify(payload))
			: response.end(JSON.stringify(list()));
	}
	return response.end("Olá Mundo!");
});

server.listen(3333);
