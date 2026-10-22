/**
 * src/routes/api/sketches/+server.js
 * ------------------------------------------------------------------
 * This is what the gallery page's form actually calls (via fetch to
 * /api/sketches — see +page.svelte). Notice it's a route INSIDE our
 * own SvelteKit app, on the SAME domain/port the browser is already
 * talking to. It then forwards the request on to Express, server-to-
 * server, using the sketchApi.js helper.
 *
 * Why not just fetch Express directly from the browser? Two reasons,
 * named in this week's teaching: (1) it's consistent with the load
 * pattern we're already using for GET, and (2) it sidesteps a real
 * CORS conversation for now — see the Week 5 assumptions block.
 * ------------------------------------------------------------------
 */

import { json } from '@sveltejs/kit';
import { createSketch } from '$lib/server/sketchApi.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	// `request` is SvelteKit's own RequestHandler event — new this
	// week, distinct from Express's req/res over on the other server.
	// request.json() reads and parses the JSON body the form's fetch()
	// call sent — same idea as Express's express.json() middleware,
	// but it's SvelteKit's own built-in method here, no extra package
	// needed.
	const data = await request.json();

	try {
		const newSketch = await createSketch(data);
		return json(newSketch, { status: 201 });
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		console.error('Failed to create sketch via Express:', message);
		return json({ error: 'Could not reach the Sketch API' }, { status: 502 });
	}
}
