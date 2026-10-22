// A load function, as in demo 12c. It runs on the server before the page is
// shown. We use load here because this sketch always needs its data as soon as
// the page opens: there is no button to wait for.
//
// The key is read from .env inside src/lib/server/neo.js.
import { getAsteroids } from '#lib/server/neo.js';

export async function load() {
	const asteroids = await getAsteroids(1); // 1 = just today
	return { asteroids: asteroids };
}
