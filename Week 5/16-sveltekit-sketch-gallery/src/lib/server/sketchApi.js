/**
 * sketchApi.js — the ONE place this SvelteKit app talks to Express.
 * ------------------------------------------------------------------
 * IMPORTANT: this file lives under src/lib/server/, which means
 * SvelteKit guarantees it can only ever be imported from other
 * server-side code (+page.server.js, +server.js, hooks.server.js).
 * If you try to import it from a .svelte component, the build will
 * fail — that's SvelteKit protecting you from accidentally shipping
 * this to the browser.
 *
 * Every call here is server-to-server: this Node process talking
 * directly to the Express Node process. The browser never sees the
 * Express URL, and never fetches it directly. Same principle as
 * Week 4's #lib/server/neo.js.
 * ------------------------------------------------------------------
 */

import { SKETCH_API_URL } from '$app/env/private';

// Fetch all sketches from the Express API.
// Deliberately does NOT catch errors here — if the fetch fails (e.g.
// Express isn't running), we want that failure to propagate up to the
// load function that called us, so IT can decide how to handle it
// with SvelteKit's error() helper. See gallery/+page.server.js.
export async function fetchSketches() {
	// await means: pause this function until the Express server
	// answers, then carry on with whatever it sent back.
	const res = await fetch(`${SKETCH_API_URL}/api/sketches`);

	if (!res.ok) {
		throw new Error(`Sketch API responded with ${res.status}`);
	}

	return res.json();
}

// Create a new sketch via the Express API. `data` is expected to look
// like { title, artist, colorTag } — the same shape the form in
// gallery/+page.svelte builds.
export async function createSketch(data) {
	const res = await fetch(`${SKETCH_API_URL}/api/sketches`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});

	if (!res.ok) {
		throw new Error(`Sketch API responded with ${res.status}`);
	}

	return res.json();
}

// --- LAB EXERCISE ------------------------------------------------------
// updateSketch() is deliberately NOT written yet. You'll add it as part
// of the PATCH lab — see the README for the full task.
//
// export async function updateSketch(id, changes) {
// 	// TODO (lab) 1: this should look a lot like createSketch() above,
// 	// just with method: 'PATCH' and a URL that includes the sketch's
// 	// id — `${SKETCH_API_URL}/api/sketches/${id}`.
// 	// TODO (lab) 2: send `changes` as the JSON body, same as
// 	// createSketch() does with `data`.
// 	// TODO (lab) 3: return the parsed JSON response, same as above.
// }
