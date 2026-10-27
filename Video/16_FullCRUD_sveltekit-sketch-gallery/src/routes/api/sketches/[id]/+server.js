/**
 * src/routes/api/sketches/[id]/+server.js
 * ------------------------------------------------------------------
 * The forwarding routes for ONE existing sketch: /api/sketches/2,
 * /api/sketches/7, ... The folder name [id] (square brackets) means "any
 * value here is allowed, and call it id" — SvelteKit hands it to us as
 * params.id.
 *
 * Two methods live here because both are about one existing sketch:
 *   PATCH  — change some of its fields (the favourite star)
 *   DELETE — remove it                 (the ✕ button)
 *
 * Same shape as ../+server.js's POST handler: the browser's fetch() lands
 * here (same domain, no CORS), and we forward it to Express server-to-server
 * using a helper from sketchApi.js.
 * ------------------------------------------------------------------
 */

import { json } from '@sveltejs/kit';
import { updateSketch, deleteSketch } from '#lib/server/sketchApi.js';

// PATCH /api/sketches/2 — change some fields of sketch 2.
export async function PATCH({ params, request }) {
	// Everything in a URL arrives as text, so "2" becomes the number 2.
	const id = params.id;

	// Reading the body gets its own try/catch: if it is missing or is not
	// valid JSON, that is the caller's mistake, so 400 = Bad Request.
	let changes;
	try {
		changes = await request.json();
	} catch (err) {
		return json({ error: 'Send a JSON body of changes' }, { status: 400 });
	}

	try {
		const updated = await updateSketch(id, changes);

		// 404 = Not Found: Express was reachable and understood us, but
		// no sketch has this id. updateSketch() gives back null for that.
		if (!updated) {
			return json({ error: `No sketch found with id ${params.id}` }, { status: 404 });
		}

		return json(updated);
	} catch (err) {
		console.error('Failed to update sketch via Express:', err.message);
		// 502 = Bad Gateway: we could not get a usable answer from the
		// service behind us (Express).
		return json({ error: 'Could not reach the Sketch API' }, { status: 502 });
	}
}

// DELETE /api/sketches/2 — remove sketch 2.
export async function DELETE({ params }) {
	const id = params.id;

	try {
		const wasDeleted = await deleteSketch(id);

		if (!wasDeleted) {
			return json({ error: `No sketch found with id ${params.id}` }, { status: 404 });
		}

		// 204 = No Content: it worked and there is nothing to send back.
		// A 204 response has no body at all, so we build a bare Response
		// instead of using json().
		return new Response(null, { status: 204 });
	} catch (err) {
		console.error('Failed to delete sketch via Express:', err.message);
		return json({ error: 'Could not reach the Sketch API' }, { status: 502 });
	}
}
