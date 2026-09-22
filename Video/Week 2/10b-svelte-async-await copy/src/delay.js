// delay.js
// A stand-in for anything that takes real time — a network request, a
// slow calculation, anything that isn't instant. Every part of this demo
// uses it to fake that wait, so nobody needs a real network connection
// for this to work.
/** @param {number} ms */
export function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
