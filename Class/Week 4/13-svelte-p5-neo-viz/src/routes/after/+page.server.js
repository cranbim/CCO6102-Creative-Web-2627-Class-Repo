// after/ deliberately uses `load` rather than the onMount+fetch pattern
// you'll find in lab/+page.svelte. This is the row-15 decision rule
// (from the Week 4 outline) in practice: this visualisation needs its
// data as soon as the page loads, with no user-triggered fetch involved
// — that's exactly the case `load` is for.
import { NASA_API_KEY } from '$app/env/private';
import { getAsteroidsWithDangerScore } from '#lib/server/neo.js';

const API_KEY = NASA_API_KEY; // src/env.js falls back to NASA's public DEMO_KEY if .env has none

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
	const asteroids = await getAsteroidsWithDangerScore(fetch, API_KEY);
	return { asteroids };
}
