// TUTOR-ONLY REFERENCE — replaces src/routes/api/sketches/[id]/+server.js
// ------------------------------------------------------------------
// Same shape as ../+server.js's POST handler — a different HTTP verb,
// and the id comes from the URL (params) instead of the request body.

import { json } from '@sveltejs/kit';
import { updateSketch } from './sketchApi.js'; // path shown relative to this reference file's own location — in the real project this is '#lib/server/sketchApi.js'

export async function PATCH({ params, request }) {
	const id = Number(params.id);
	const changes = await request.json();

	try {
		const updated = await updateSketch(id, changes);
		return json(updated);
	} catch (err) {
		console.error('Failed to update sketch via Express:', err.message);
		// 502 = Bad Gateway, same reasoning as ../+server.js's POST
		// handler: we couldn't get a usable answer from Express.
		return json({ error: 'Could not reach the Sketch API' }, { status: 502 });
	}
}

// STRETCH (solved): if Express itself returns 404 (no sketch with that
// id), updateSketch()'s `throw new Error(...)` fires and this route
// answers 502 — technically true (we couldn't get a GOOD answer), but
// it blurs "the id was wrong" with "Express is unreachable". A sharper
// version would have updateSketch() pass the real status code back
// instead of always throwing, so this route could tell the two apart
// and answer 404 itself when that's what actually happened.
