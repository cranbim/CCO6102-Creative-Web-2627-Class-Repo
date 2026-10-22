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

import { SKETCH_API_URL } from '$app/env/private';

export async function fetchSketches() {
	// await means: pause this function until Express answers, then
	// carry on with whatever it sent back.
	const res = await fetch(`${SKETCH_API_URL}/api/sketches`);

	if (!res.ok) {
		throw new Error(`Sketch API responded with ${res.status}`);
	}

	return res.json();
}
