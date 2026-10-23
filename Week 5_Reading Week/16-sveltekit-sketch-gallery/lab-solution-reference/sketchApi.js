// TUTOR-ONLY REFERENCE — replaces src/lib/server/sketchApi.js
// ------------------------------------------------------------------
// Same file as the student starter, with updateSketch() added.

import { SKETCH_API_URL } from '$app/env/private';

export async function fetchSketches() {
	const res = await fetch(`${SKETCH_API_URL}/api/sketches`);
	if (!res.ok) {
		throw new Error(`Sketch API responded with ${res.status}`);
	}
	return res.json();
}

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

// --- PATCH lab, solved ---------------------------------------------------
export async function updateSketch(id, changes) {
	const res = await fetch(`${SKETCH_API_URL}/api/sketches/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(changes)
	});
	if (!res.ok) {
		throw new Error(`Sketch API responded with ${res.status}`);
	}
	return res.json();
}
