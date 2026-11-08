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

// Change some fields of one sketch via the Express API. `changes` holds only
// the fields to change, e.g. { favourite: true }.
// Returns the updated sketch, or null if Express says no sketch has that id
// (404) — the same "null means not found" idea as sketchData.update() over
// on the Express side. Any other failure throws, so the route can answer 502.
export async function updateSketch(id, changes) {
	const res = await fetch(`${SKETCH_API_URL}/api/sketches/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(changes)
	});

	if (res.status === 404) {
		return null;
	}

	if (!res.ok) {
		throw new Error(`Sketch API responded with ${res.status}`);
	}

	return res.json();
}

// Delete one sketch via the Express API.
// Returns true if it was deleted, false if Express says no sketch has that id
// (404) — the same idea as sketchData.remove(). Any other failure throws.
export async function deleteSketch(id) {
	const res = await fetch(`${SKETCH_API_URL}/api/sketches/${id}`, {
		method: 'DELETE'
	});

	if (res.status === 404) {
		return false;
	}

	// A successful delete answers 204 No Content, which counts as ok.
	// There is no body to read, so we do not call res.json() here.
	if (!res.ok) {
		throw new Error(`Sketch API responded with ${res.status}`);
	}

	return true;
}
