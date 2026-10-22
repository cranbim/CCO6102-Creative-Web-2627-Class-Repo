import { json, error } from '@sveltejs/kit';
import { getAsteroids } from '#lib/server/neo.js';

// LAB: this route currently ignores the number of days and always returns today.
// Make it accept a ?days= value, so that /api/neo-lab?days=3 returns 3 days of asteroids.
//
// 1. Read the value:   url.searchParams.get('days')
//    It gives you a STRING, or null if ?days= is missing.
// 2. Turn it into a number with Number(...).
// 3. Check it is a whole number from 1 to 7 (NASA's limit). If not, send back
//    a 400 like demo 12b did:  return json({ error: '...' }, { status: 400 });
//    Tip: Number.isInteger(days) tells you if it is a whole number.
// 4. Pass your number to getAsteroids(...) instead of the 1.
//
// STRETCH: if ?days= is missing, use 1 instead of returning a 400.
//
// The { url } in the line below picks the `url` out of the object SvelteKit
// passes to every request handler.
export async function GET({ url }) {
	try {
		const asteroids = await getAsteroids(1);
		return json(asteroids);
	} catch (err) {
		error(502, 'Could not fetch asteroid data: ' + err.message);
	}
}
