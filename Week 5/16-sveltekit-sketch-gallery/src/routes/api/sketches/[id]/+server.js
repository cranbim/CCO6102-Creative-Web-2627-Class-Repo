/**
 * src/routes/api/sketches/[id]/+server.js
 * ------------------------------------------------------------------
 * LAB EXERCISE — this file is intentionally incomplete.
 *
 * This should become the forwarding route for the favourite-toggle
 * button in gallery/+page.svelte, the SAME shape as the POST route
 * one folder up (../+server.js) — just a different HTTP verb, and
 * reading the sketch's id from the URL instead of the request body.
 *
 * Steps:
 *   1. Add an `updateSketch(id, changes)` function to
 *      $lib/server/sketchApi.js (there's a TODO there showing the shape)
 *   2. Write the PATCH handler below, following the pattern of the
 *      POST handler in ../+server.js
 *   3. Wire up gallery/+page.svelte's toggleFavourite() function to
 *      actually fetch() this route
 *
 * ------------------------------------------------------------------
 */

// import { json } from '@sveltejs/kit';
// import { updateSketch } from '$lib/server/sketchApi.js';

/** @type {import('./$types').RequestHandler} */
export async function PATCH({ params, request }) {
	// TODO (lab):
	// const id = Number(params.id);
	// const changes = await request.json();
	// const updated = await updateSketch(id, changes);
	// return json(updated);

	return new Response('PATCH not implemented yet — this is the lab exercise!', {
		status: 501
	});
}
