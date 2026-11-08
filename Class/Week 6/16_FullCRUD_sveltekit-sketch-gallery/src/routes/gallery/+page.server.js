/**
 * +page.server.js — the load function for /gallery.
 * ------------------------------------------------------------------
 * This runs on the SERVER, before the page is sent to the browser.
 * It fetches from our own Express API (never the client — see
 * sketchApi.js) and hands the result to +page.svelte via the `data`
 * prop.
 *
 * THE MAIN TEACHING MOMENT THIS WEEK: what happens if that fetch
 * fails? Try it — stop the Express server (Ctrl-C in its terminal)
 * and reload this page. Without the try/catch below, SvelteKit would
 * fall back to its own generic, unstyled default error page. With
 * it, we get a clean, expected error via the error() helper, and our
 * own +error.svelte (one folder up) gets to render something better.
 * ------------------------------------------------------------------
 */

import { error } from '@sveltejs/kit';
import { fetchSketches } from '#lib/server/sketchApi.js';

export async function load() {
	try {
		// await means: pause this function until the Express server
		// answers, then carry on with the result.
		const sketches = await fetchSketches();
		return { sketches };
	} catch (err) {
		// This is an EXPECTED error — we know exactly what went wrong
		// (the Sketch API didn't respond) and we can give the user a
		// clear, honest message instead of a generic crash page.
		console.error('Failed to reach the Sketch API:', err.message);

		// 502 = Bad Gateway: we could not get an answer from the
		// service behind us.
		error(502, "Couldn't reach the Sketch Gallery API. Is 15_FullCRUD_express-sketch-api running on port 3001?");
	}
}
