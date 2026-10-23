/**
 * src/routes/gallery/+page.server.js — gets the sketches for the /gallery page.
 * ------------------------------------------------------------------
 * The file name matters: '+page.server.js' means this file only ever runs on
 * the server, before the page is sent to the browser. Whatever load() returns
 * arrives in +page.svelte as the `data` prop, like load() in demo 12c.
 *
 * load() calls sketchData.getAll() directly. The data lives in the same
 * SvelteKit app, so there is nothing to fetch. In demo 15 the data moves to a
 * separate Express server, and THIS is the line that changes: it will fetch
 * from Express instead of calling sketchData.
 *
 * (What if getting the data fails? With an array in memory it cannot. We
 * handle that properly when the data is behind Express, in demo 16.)
 * ------------------------------------------------------------------
 */

import * as sketchData from '#lib/server/sketchData.js';

export function load() {
	const sketches = sketchData.getAll();
	return { sketches: sketches };
}
