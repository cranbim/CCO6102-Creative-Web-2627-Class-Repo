/**
 * sketchApi.js — same idea as 16-sveltekit-sketch-gallery's version.
 * ------------------------------------------------------------------
 * This project doesn't run its own copy of the Express API — it
 * points at the SAME 15-express-sketch-api instance on port 3001.
 * That's deliberate: it's the clearest way to show that this
 * visualisation and Track 1's gallery/form are reading and writing
 * the SAME data. Add a sketch via Track 1's form, then reload this
 * project's /viz page — it'll be there.
 *
 * Only GET is needed here — this project is read-only.
 * ------------------------------------------------------------------
 */

import { SKETCH_API_URL } from '$env/static/private';

/**
 * @typedef {object} Sketch
 * @property {number} id
 * @property {string} title
 * @property {string} artist
 * @property {string} colorTag
 * @property {boolean} favourite
 */

/**
 * @returns {Promise<Array<Sketch>>}
 */
export async function fetchSketches() {
	const res = await fetch(`${SKETCH_API_URL}/api/sketches`);

	if (!res.ok) {
		throw new Error(`Sketch API responded with ${res.status}`);
	}

	return res.json();
}
