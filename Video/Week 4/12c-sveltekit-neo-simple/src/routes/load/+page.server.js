// This is a load function. SvelteKit runs it on the server BEFORE the page is
// shown, every time someone visits /load. Whatever it returns becomes the
// `data` prop in +page.svelte.
//
// The file name matters. "+page.server.js" means this file only ever runs on
// the server, so it is safe to use secrets here. Open dev tools on /load and
// you will find no NASA request and no key in the browser at all.
//
// The key itself is used inside src/lib/server/neo.js. It comes from .env.
import { getAsteroids } from '#lib/server/neo.js';

export async function load() {
	// await means: wait for NASA's answer before carrying on.
	// (What if NASA is down? We handle errors properly next week.)
	const asteroids = await getAsteroids(1); // 1 = just today

	return { asteroids: asteroids };
}
