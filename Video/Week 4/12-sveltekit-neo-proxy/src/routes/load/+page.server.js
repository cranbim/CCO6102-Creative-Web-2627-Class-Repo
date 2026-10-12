// This is a load function. It runs automatically, server-side, whenever
// someone navigates to this route — BEFORE the page renders. Compare
// this file to src/routes/api/neo/+server.js: same underlying helper,
// completely different way of getting data to the page.
//
// Because this file is named +page.server.js (not +page.js), it is
// GUARANTEED to only ever run on the server — SvelteKit enforces this at
// build time, the same guarantee #lib/server/ files get. That's what
// makes it safe to read the API key here.
import { NASA_API_KEY } from '$app/env/private';
import { getAsteroidsWithDangerScore } from '#lib/server/neo.js';

const API_KEY = NASA_API_KEY; // src/env.js falls back to NASA's public DEMO_KEY if .env has none

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
	// Whatever we return here becomes the `data` prop in +page.svelte —
	// no fetch(), no loading state, no button. By the time the browser
	// sees this page, the data is already part of it.
	const asteroids = await getAsteroidsWithDangerScore(fetch, API_KEY);
	console.log(asteroids)
	return { asteroids };
}
