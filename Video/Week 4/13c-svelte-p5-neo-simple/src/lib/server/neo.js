// This file lives in src/lib/server/. SvelteKit guarantees that anything in a
// folder called "server" can never be sent to the browser. That makes it a safe
// home for two things: the API key, and our secret "danger score" formula.

// The key comes from your .env file (declared in src/env.js). SvelteKit only
// allows this import in server code, and gives a build error if you try it in
// a +page.svelte file.
import { NASA_API_KEY } from '$app/env/private';

// Fetches asteroids from NASA and adds a danger score to each one.
// days = how many days to fetch, starting today (NASA allows 1 to 7).
export async function getAsteroids(days) {
	// Work out the start and end dates, written the way NASA wants them: 2026-10-21
	const start = new Date();
	const end = new Date();
	end.setDate(end.getDate() + days - 1);
	const startDate = start.toISOString().slice(0, 10);
	const endDate = end.toISOString().slice(0, 10);

	const url =
		'https://api.nasa.gov/neo/rest/v1/feed' +
		'?start_date=' + startDate +
		'&end_date=' + endDate +
		'&api_key=' + NASA_API_KEY;

	// await means: pause this function until NASA answers, then carry on.
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('NASA responded with status ' + response.status);
	}
	const data = await response.json();

	// NASA groups its asteroids by date, like this:
	//   { "2026-10-21": [ asteroid, asteroid ], "2026-10-22": [ asteroid ] }
	// This loop visits each date and collects every asteroid into one list.
	const results = [];
	for (const date in data.near_earth_objects) {
		const asteroidsOnThatDay = data.near_earth_objects[date];

		for (const neo of asteroidsOnThatDay) {
			const diameterKm = neo.estimated_diameter.kilometers.estimated_diameter_max;
			const approach = neo.close_approach_data[0];
			const velocityKmH = Number(approach.relative_velocity.kilometers_per_hour);
			const missDistanceKm = Number(approach.miss_distance.kilometers);

			// The "danger score" mixes size, speed and (inverse) distance into one
			// number. The formula is deliberately simple: the point is WHERE it
			// lives. It stays on the server, and the browser only ever receives
			// the finished number.
			const dangerScore = Math.round(((diameterKm * velocityKmH) / missDistanceKm) * 1000);

			results.push({
				id: neo.id,
				name: neo.name,
				diameterKm: Number(diameterKm.toFixed(3)),
				velocityKmH: Math.round(velocityKmH),
				missDistanceKm: Math.round(missDistanceKm),
				hazardous: neo.is_potentially_hazardous_asteroid,
				dangerScore: dangerScore
			});
		}
	}

	return results;
}
