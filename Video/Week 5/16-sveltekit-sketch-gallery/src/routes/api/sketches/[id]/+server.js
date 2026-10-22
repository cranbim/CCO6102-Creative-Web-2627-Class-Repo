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
 * LAB STEPS:
 *   1. Add an updateSketch(id, changes) function to
 *      #lib/server/sketchApi.js (there's a TODO there showing the shape)
 *   2. Write the PATCH handler below, following the pattern of the
 *      POST handler in ../+server.js
 *   3. Wire up gallery/+page.svelte's toggleFavourite() function to
 *      actually fetch() this route
 *
 * TIP: `params.id` arrives as a STRING (everything in a SvelteKit
 * URL does) — convert it with Number(params.id) before comparing it
 * to anything, same as the Express PATCH lab in demo 15.
 *
 * STRETCH: once this works, make the 404 case (an id that doesn't
 * exist) send back a proper error response instead of whatever
 * updateSketch() happens to return when nothing matched.
 * ------------------------------------------------------------------
 */

// import { json } from '@sveltejs/kit';
// import { updateSketch } from '#lib/server/sketchApi.js';

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
