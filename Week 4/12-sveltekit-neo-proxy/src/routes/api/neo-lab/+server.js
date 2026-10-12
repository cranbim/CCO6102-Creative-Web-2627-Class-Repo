import { json, error } from '@sveltejs/kit';
import { NASA_API_KEY } from '$app/env/private';
import { getAsteroidsWithDangerScore } from '#lib/server/neo.js';

const API_KEY = NASA_API_KEY; // src/env.js falls back to NASA's public DEMO_KEY if .env has none

// TODO (lab exercise): this currently behaves exactly like /api/neo.
// Your task: make it accept a `?days=` query parameter (e.g. /api/neo-lab?days=3)
// that controls how many days of asteroid data to fetch, instead of always
// fetching just today.
//
// Hints:
// - `url` is available on the RequestEvent — see the GET signature below.
// - Read the value with `url.searchParams.get('days')`.
// - NASA's feed endpoint takes `start_date` and `end_date` — you'll need
//   to compute an end_date that many days after today.
//   (new Date() + adding days in milliseconds is the simplest approach.)
// - The current src/lib/server/neo.js helper always requests a single day —
//   you'll likely need to either extend that helper to accept a date range,
//   or write the date-range fetch directly in this file.
// - Validate the input! What should happen if `days` isn't a number, or is
//   negative, or is huge? (NASA's feed endpoint has its own 7-day max —
//   what happens if you ask for more than that?)
//
// STRETCH CHALLENGE: once this works, try adding a completely separate
// endpoint (a new folder under src/routes/api/) that proxies a DIFFERENT
// NeoWs query — e.g. a specific asteroid by ID via the 'lookup' endpoint
// (https://api.nasa.gov/neo/rest/v1/neo/{asteroid_id}).

/** @type {import('./$types').RequestHandler} */
export async function GET({ fetch, url }) {
	try {
		// Currently ignores `url` entirely — that's what you're fixing.
		const asteroids = await getAsteroidsWithDangerScore(fetch, API_KEY);
		return json(asteroids);
	} catch (/** @type {any} */ err) {
		error(502, `Could not fetch asteroid data: ${err.message}`);
	}
}
