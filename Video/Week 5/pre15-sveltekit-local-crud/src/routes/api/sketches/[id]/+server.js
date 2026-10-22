/**
 * src/routes/api/sketches/[id]/+server.js — the "one sketch" endpoint:
 * /api/sketches/2, /api/sketches/7, ...
 * ------------------------------------------------------------------
 * The folder name [id] (square brackets) means "any value here is allowed, and
 * call it id". SvelteKit hands it to us as params.id. It is the same idea as
 * the [slug] folder from Week 4's dynamic routes, but in an API route instead
 * of a page.
 *
 * Two methods live here because both are about ONE existing sketch:
 *   PATCH  — change some of its fields   (the Update in CRUD)
 *   DELETE — remove it                   (the Delete in CRUD)
 *
 * Same shape as ../+server.js: check, call one sketchData function, answer
 * with the right status code.
 * ------------------------------------------------------------------
 */

import { json } from '@sveltejs/kit';
import * as sketchData from '#lib/server/sketchData.js';

// PATCH /api/sketches/2 — change some fields of sketch 2.
// The body holds only the fields to change, e.g. { "favourite": true }.
export async function PATCH({ params, request }) {
	// Everything in a URL arrives as text, so "2" has to become the number 2
	// before it can match a sketch's id. (If it is not a number at all we get
	// NaN, nothing matches it, and we answer 404 below.)
	const id = Number(params.id);

	let changes;
	try {
		changes = await request.json();
	} catch (err) {
		return json({ error: 'Send a JSON body of changes' }, { status: 400 });
	}

	// A body of just `null` parses fine but is not a set of changes.
	if (!changes) {
		return json({ error: 'Send a JSON body of changes' }, { status: 400 });
	}

	try {
		const updated = sketchData.update(id, changes);

		// 404 = Not Found: the request was fine, but there is no sketch with
		// that id to change. update() gives back null when that happens.
		if (!updated) {
			return json({ error: 'No sketch found with id ' + params.id }, { status: 404 });
		}

		return json(updated);
	} catch (err) {
		console.error('Failed to update sketch:', err.message);
		return json({ error: 'Could not update sketch' }, { status: 500 });
	}
}

export async function GET({ params }) {
	
	const id = Number(params.id);

	
	try {
		const sketch = sketchData.getById(id);

		// 404 = Not Found: the request was fine, but there is no sketch with
		// that id to change. update() gives back null when that happens.
		if (!sketch) {
			return json({ error: 'No sketch found with id ' + params.id }, { status: 404 });
		}

		return json(sketch);
	} catch (err) {
		console.error('Failed to read sketch:', err.message);
		return json({ error: 'Could not read sketch' }, { status: 500 });
	}
}

// DELETE /api/sketches/2 — remove sketch 2.
export function DELETE({ params }) {
	const id = Number(params.id);

	try {
		const wasRemoved = sketchData.remove(id);

		if (!wasRemoved) {
			return json({ error: 'No sketch found with id ' + params.id }, { status: 404 });
		}

		// 204 = No Content: it worked, and there is nothing left to send back,
		// because the sketch no longer exists. A 204 response has no body at
		// all, so we build a bare Response instead of using json().
		return new Response(null, { status: 204 });
	} catch (err) {
		console.error('Failed to delete sketch:', err.message);
		return json({ error: 'Could not delete sketch' }, { status: 500 });
	}
}
