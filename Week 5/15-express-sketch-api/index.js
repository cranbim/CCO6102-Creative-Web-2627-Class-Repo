/**
 * index.js — the standalone Sketch Gallery API.
 * ------------------------------------------------------------------
 * THIS IS A COMPLETELY SEPARATE APP from the SvelteKit project
 * (16-sveltekit-sketch-gallery). It has its own package.json, its
 * own port, and its own `npm run dev`. It has never heard of Svelte
 * and doesn't need to.
 *
 * Notice how thin these route handlers are — each one just calls a
 * function from ./lib/sketchData.js and sends the result back.
 * All the "how do we actually store/find/change data" logic lives
 * over there, not here. See sketchData.js for why.
 * ------------------------------------------------------------------
 */

import express from 'express';
import * as sketchData from './lib/sketchData.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Parses incoming JSON request bodies into req.body.
// Needed before any route that reads req.body (our POST/PATCH routes).
app.use(express.json());

// A little request logger — genuinely useful when you're running two
// servers side by side and trying to see who's talking to whom.
app.use((req, res, next) => {
	console.log(`[sketch-api] ${req.method} ${req.path}`);
	next();
});

// --- GET /api/sketches — list every sketch ---------------------------------
// Taught live in the "Building a standalone Express Data API" segment.
app.get('/api/sketches', (req, res) => {
	res.json(sketchData.getAll());
});

// --- POST /api/sketches — add a new sketch ----------------------------------
// Taught live in the "POST — adding new data via a form" segment.
app.post('/api/sketches', (req, res) => {
	// Modern JS syntax note: `req.body ?? {}` is the nullish coalescing
	// operator (??). If req.body ends up null or undefined (e.g. no
	// body was sent at all), we fall back to an empty object instead
	// of crashing when we try to destructure title/artist/colorTag
	// out of it below.
	const { title, artist, colorTag } = req.body ?? {};

	if (!title || !artist || !colorTag) {
		return res.status(400).json({ error: 'title, artist and colorTag are all required' });
	}

	const newSketch = sketchData.create({ title, artist, colorTag });
	res.status(201).json(newSketch);
});

// --- PATCH /api/sketches/:id — update an existing sketch ---------------------
// LAB EXERCISE — not taught live this week. See README.md "Lab" section.
// sketchData.update(id, changes) already exists and works — your job is just
// to wire THIS route to call it, the same way the POST route above calls
// sketchData.create().
//
// app.patch('/api/sketches/:id', (req, res) => {
// 	// TODO (lab): read the id from req.params, the changes from req.body,
// 	// call sketchData.update(id, changes), and send the result back as JSON.
// 	// Don't forget: what should happen if sketchData.update() returns null
// 	// (i.e. no sketch had that id)? Look at how the POST route above
// 	// handles a bad request for inspiration.
// });

// --- DELETE /api/sketches/:id — remove a sketch -------------------------------
// STRETCH CHALLENGE — optional, for early finishers. sketchData.remove(id)
// already exists and works, same idea as the PATCH TODO above.
//
// app.delete('/api/sketches/:id', (req, res) => {
// 	// TODO (stretch): wire this up to sketchData.remove(id).
// });

app.listen(PORT, () => {
	console.log(`Sketch Gallery API listening on http://localhost:${PORT}`);
	console.log(`Try it: http://localhost:${PORT}/api/sketches`);
});
