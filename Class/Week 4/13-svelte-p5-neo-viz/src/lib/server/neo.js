// This file lives under src/lib/server/, which SvelteKit treats as
// server-only — it can NEVER be imported from client code (+page.svelte).
// That's what makes it a safe place for the API key and the 'danger score'
// formula to live. See: https://svelte.dev/docs/kit/server-only-modules

const NEO_FEED_URL = 'https://api.nasa.gov/neo/rest/v1/feed';

/**
 * Fetches today's near-Earth asteroids from NASA's NeoWs API and shapes
 * the response for our app: only the fields we need, plus a bespoke
 * 'danger score' computed here on the server.
 *
 * The formula is deliberately simple — the teaching point is WHERE this
 * calculation lives (server-only), not how clever it is.
 *
 * @param {typeof fetch} fetchFn - pass in the `fetch` from the request event
 * @param {string} apiKey
 */
export async function getAsteroidsWithDangerScore(fetchFn, apiKey) {
	const today = new Date().toISOString().slice(0, 10);

	const url = new URL(NEO_FEED_URL);
	url.searchParams.set('start_date', today);
	url.searchParams.set('end_date', today);
	url.searchParams.set('api_key', apiKey);

	const response = await fetchFn(url);

	if (!response.ok) {
		throw new Error(`NASA NeoWs responded with ${response.status}`);
	}

	const data = await response.json();

	// The raw response is grouped by date: { "2026-09-01": [ {...}, {...} ] }
	// Object.values(...).flat() turns that into one flat array of asteroids.
	const asteroids = Object.values(data.near_earth_objects).flat();

	return asteroids.map((neo) => {
		const diameterKm = neo.estimated_diameter.kilometers.estimated_diameter_max;
		const approach = neo.close_approach_data[0];
		const velocityKmH = Number(approach.relative_velocity.kilometers_per_hour);
		const missDistanceKm = Number(approach.miss_distance.kilometers);

		// 'Danger score' — combines diameter, velocity and (inverse) miss
		// distance into a single number. This formula never ships to the
		// client — only the resulting score does. That's the whole point.
		const dangerScore = Math.round(
			((diameterKm * velocityKmH) / missDistanceKm) * 1000
		);

		return {
			id: neo.id,
			name: neo.name,
			diameterKm: Number(diameterKm.toFixed(3)),
			velocityKmH: Math.round(velocityKmH),
			missDistanceKm: Math.round(missDistanceKm),
			hazardous: neo.is_potentially_hazardous_asteroid,
			dangerScore
		};
	});
}
