import { json, error } from '@sveltejs/kit';
// $app/env/private can NEVER be imported into client code — SvelteKit will
// throw a build error if you try. This is the mechanism that keeps secrets
// server-only. The variable itself is declared in src/env.js.
// https://svelte.dev/docs/kit/environment-variables
import { NASA_API_KEY } from '$app/env/private';
import { getAsteroidsWithDangerScore } from '#lib/server/neo.js';

// Falls back to NASA's public DEMO_KEY if no personal key is set in .env —
// genuinely public, rate-limited (30/hr), safe to commit, works out of the
// box for anyone cloning this repo. See README for getting a real key.
const API_KEY = NASA_API_KEY; // src/env.js falls back to NASA's public DEMO_KEY if .env has none

/** @type {import('./$types').RequestHandler} */
export async function GET({ fetch }) {
	try {
		const asteroids = await getAsteroidsWithDangerScore(fetch, API_KEY);
		return json(asteroids);
	} catch (/** @type {any} */ err) {
		error(502, `Could not fetch asteroid data: ${err.message}`);
	}
}
