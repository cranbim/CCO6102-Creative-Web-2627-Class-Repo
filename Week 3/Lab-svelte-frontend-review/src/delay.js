// delay.js
// Same helper as the async/await demo — a stand-in for anything slow.
/** @param {number} ms */
export function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
