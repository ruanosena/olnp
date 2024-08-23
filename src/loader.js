import path from "node:path";
import fs from "node:fs";

const basePath = path.resolve("public");
const rawPath = path.join(basePath, "raw");

/**
 * @typedef {Object} RawCard
 * @prop {string} id
 * @prop {CardData} data
 * @prop {{}} metadata
 */

/**
 * @typedef {Object} Card
 * @prop {string} id
 * @prop {CardData} data
 * @prop {CardMetadata} metadata
 */

/**
 * @typedef {Object} CardData
 * @prop {string} background
 * @prop {string} description
 * @prop {string} hobby
 */

/**
 * @typedef {Object} CardMetadata
 * @prop {number} createdAt
 * @prop {number} updatedAt
 */

export function list() {
	return fs.readdirSync(rawPath).map((rawCard) => rawCard.slice(0, rawCard.lastIndexOf(".")));
}

/**
 * @param {string} raw
 * @returns {Card | null}
 */

export function load(raw) {
	const fileName = `${raw}.json`;
	const filePath = path.join(rawPath, fileName);
	if (fs.existsSync(filePath)) {
		/** @type {RawCard} */
		const file = JSON.parse(fs.readFileSync(filePath, "utf-8"));
		const stats = fs.statSync(filePath);
		return {
			...file,
			metadata: {
				createdAt: stats.birthtimeMs,
				updatedAt: stats.atimeMs,
			},
		};
	}
	return null;
}

/** @typedef {string} Doc */

/**
 * @param {string} name
 * @param {"html" | "amp"} version
 * @returns {Doc}
 */
export function page(name, version) {
	const fileName = version === "html" ? `${name}.html` : `${name}.amp.html`;
	const filePath = path.join(basePath, fileName);
	return fs.readFileSync(filePath);
}
