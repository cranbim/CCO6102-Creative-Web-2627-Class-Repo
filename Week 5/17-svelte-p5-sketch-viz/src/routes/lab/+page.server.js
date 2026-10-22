/**
 * +page.server.js — fetches the Sketch Gallery data for the p5
 * visualisation, using the SAME load pattern taught in Track 1
 * (row 15's decision rule: data needed as soon as the page loads ->
 * load is the natural choice — a visualisation is exactly that case).
 */

import { error } from '@sveltejs/kit';
import { fetchSketches } from '$lib/server/sketchApi.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	try {
		const sketches = await fetchSketches();
		return { sketches };
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		console.error('Failed to reach the Sketch API:', message);
		error(502, {
			message: "Couldn't reach the Sketch Gallery API. Is 15-express-sketch-api running on port 3001?"
		});
	}
}
