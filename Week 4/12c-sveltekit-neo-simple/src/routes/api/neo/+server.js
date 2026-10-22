// An API route, like the one in demo 12b. The folder path is the URL
// (/api/neo) and the exported function name is the HTTP method (GET).
// It does the same job as the load function, but only when the browser asks.
import { json, error } from '@sveltejs/kit';
import { getAsteroids } from '#lib/server/neo.js';

export async function GET() {
	try {
		const asteroids = await getAsteroids(1); // 1 = just today
		return json(asteroids);
	} catch (err) {
		// 502 = "Bad Gateway": we could not get an answer from the service
		// behind us (NASA). The browser can show this message.
		error(502, 'Could not fetch asteroid data: ' + err.message);
	}
}
