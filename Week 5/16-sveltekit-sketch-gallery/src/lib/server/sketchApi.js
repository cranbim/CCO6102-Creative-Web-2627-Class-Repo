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
 * Week 4's $lib/server/neo.js.
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
 * Fetch all sketches from the Express API.
 * Deliberately does NOT catch errors here — if the fetch fails (e.g.
 * Express isn't running), we want that failure to propagate up to the
 * load function that called us, so IT can decide how to handle it
 * with SvelteKit's error() helper. See gallery/+page.server.js.
 * @returns {Promise<Array<Sketch>>}
 */
export async function fetchSketches() {
	const res = await fetch(`${SKETCH_API_URL}/api/sketches`);

	if (!res.ok) {
		throw new Error(`Sketch API responded with ${res.status}`);
	}

	return res.json();
}

/**
 * Create a new sketch via the Express API.
 * @param {{title: string, artist: string, colorTag: string}} data
 * @returns {Promise<Sketch>} the created sketch
 */
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
// of the PATCH lab — see the README for the full task. It should look a
// lot like createSketch() above, just with method: 'PATCH' and a URL
// that includes the sketch's id.
//
// export async function updateSketch(id, changes) {
// 	// TODO (lab): fetch `${SKETCH_API_URL}/api/sketches/${id}`,
// 	// method PATCH, JSON body of `changes`, return the parsed JSON.
// }
