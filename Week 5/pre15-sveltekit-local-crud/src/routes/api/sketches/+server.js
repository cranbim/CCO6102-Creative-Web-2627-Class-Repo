/**
 * src/routes/api/sketches/+server.js — the "collection" endpoint: /api/sketches
 * ------------------------------------------------------------------
 * The file name matters: '+server.js' means "this is an API route, not a page".
 * The folder path is the URL (/api/sketches) and each exported function name is
 * the HTTP method it answers (GET, POST), like the API route in demo 12b.
 *
 * Notice how thin these handlers are. They do not touch the sketch data. They
 * check the request, call ONE function from sketchData.js, and send back the
 * answer with a status code. The module decides how data is stored; the route
 * decides how to talk HTTP.
 *
 * (The gallery page's load() does not use this GET route. load() calls
 * sketchData.getAll() itself, straight on the server. This GET exists so you
 * can look at the raw JSON in a browser at /api/sketches, and so there is a URL
 * for the Express version in demo 15 to copy.)
 * ------------------------------------------------------------------
 */

import { json } from '@sveltejs/kit';
import * as sketchData from '#lib/server/sketchData.js';

// GET /api/sketches — list every sketch.
export function GET() {
	const sketches = sketchData.getAll();
	return json(sketches);
}

// POST /api/sketches — add a new sketch.
// `async` because reading the body of a request takes time. Inside it, `await`
// means: pause this function until the body has arrived, then carry on.
export async function POST({ request }) {
	// request.json() reads the JSON the browser's fetch() sent. If the body is
	// missing or is not valid JSON it throws, so it gets its own try/catch.
	let data;
	try {
		data = await request.json();
	} catch (err) {
		// 400 = Bad Request: the caller sent us something we cannot use.
		return json({ error: 'Send a JSON body' }, { status: 400 });
	}

	// All three fields are required. `!data` catches a body of just `null`.
	// (We keep validation this plain on purpose: a few checks, no library.)
	if (!data || !data.title || !data.artist || !data.colorTag) {
		return json({ error: 'title, artist and colorTag are all required' }, { status: 400 });
	}

	try {
		const newSketch = sketchData.create({
			title: data.title,
			artist: data.artist,
			colorTag: data.colorTag
		});

		// 201 = Created: it worked AND a new thing now exists. More precise
		// than a plain 200.
		return json(newSketch, { status: 201 });
	} catch (err) {
		// 500 = Internal Server Error: our fault, not the caller's. This cannot
		// really happen with an array in memory, but with a real database
		// (Week 6) it can, so the habit starts now.
		console.error('Failed to create sketch:', err.message);
		return json({ error: 'Could not create sketch' }, { status: 500 });
	}
}
