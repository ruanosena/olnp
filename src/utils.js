/**
 * @param {string} pathname
 * @returns {string}
 */
export function getUrlFirstPortion(pathname) {
	const composed = pathname.indexOf("/", 1) > -1;
	return pathname.slice(1, composed ? pathname.indexOf("/", 1) : undefined);
}

/**
 * @typedef {Object} Resource
 * @prop {string} name
 * @prop {"html" | "amp"} version
 */

/**
 * @param {string} resource
 * @returns {Resource?}
 */
export function getResourcePage(resource) {
	/**
	 * @param {string?} name
	 *  @param {string?} extension
	 */
	function validateType(name, extension) {
		/** @type {Resource} */
		const output = {};
		if (!!name && name !== "index") {
			if (!extension && ["amp", "html"].includes(name)) {
				output.name = "index";
				extension = name;
			} else if (name === "nao-encontrado") output.name = "notFound";
			else return null;
		}

		if (["", "html"].includes(extension) || !extension /* index */) output.version = "html";
		else if (["amp.html", "amp"].includes(extension)) output.version = "amp";
		else return null;
		return output;
	}

	const extensionIndex = resource.indexOf(".");
	if (extensionIndex === -1) return validateType(resource);
	else if (extensionIndex === 0) return null; // sem nome de recurso
	return validateType(resource.slice(0, extensionIndex), resource.slice(extensionIndex + 1));
}
