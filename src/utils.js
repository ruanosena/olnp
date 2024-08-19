/**
 * @param {string} pathname
 * @returns {string}
 */
export function getUrlFirstPortion(pathname) {
	const composed = pathname.indexOf("/", 1) > -1;
	return pathname.slice(1, composed ? pathname.indexOf("/", 1) : undefined);
}
