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
// try/catch here even though sketchData.getAll() can't actually fail
// (it's just reading an in-memory array) — the point is the HABIT: every
// route handler from this week on wraps its work in try/catch, because
// once sketchData.js is talking to a real database in Week 6, these same
// calls genuinely can throw.
app.get('/api/sketches', (req, res) => {
	try {
		const sketches = sketchData.getAll();
		res.json(sketches);
	} catch (err) {
		console.error('Failed to read sketches:', err.message);
		res.status(500).json({ error: 'Could not read sketches' });
	}
});

// --- POST /api/sketches — add a new sketch ----------------------------------
// Taught live in the "POST — adding new data via a form" segment.
app.post('/api/sketches', (req, res) => {
	try {
		// express.json() only fills in req.body when the request actually
		// SAYS it's sending JSON (a Content-Type: application/json
		// header). A request with no body and no header at all leaves
		// req.body undefined — this check catches that case explicitly,
		// rather than reaching for the ?? operator to paper over it.
		if (!req.body) {
			return res.status(400).json({ error: 'title, artist and colorTag are all required' });
		}

		const { title, artist, colorTag } = req.body;

		// 400 = Bad Request: the client sent us something we can't use.
		// This is OUR fault-check, not a server failure, so it happens
		// before the try/catch's "something went wrong on our end" logic.
		if (!title || !artist || !colorTag) {
			return res.status(400).json({ error: 'title, artist and colorTag are all required' });
		}

		const newSketch = sketchData.create({ title, artist, colorTag });

		// 201 = Created: the request succeeded AND a new resource now
		// exists, which is a more specific, more honest answer than a
		// plain 200 would be.
		res.status(201).json(newSketch);
	} catch (err) {
		console.error('Failed to create sketch:', err.message);
		res.status(500).json({ error: 'Could not create sketch' });
	}
});

// --- PATCH /api/sketches/:id — update an existing sketch ---------------------
// LAB EXERCISE — not taught live this week. See README.md "Lab" section.
// sketchData.update(id, changes) already exists and works — your job is just
// to wire THIS route to call it, the same way the POST route above calls
// sketchData.create().
//
// app.patch('/api/sketches/:id', (req, res) => {
// 	// TODO (lab) 1: read the id out of the URL. Express puts it on
// 	// req.params as a STRING, so it needs converting to a number
// 	// before sketchData.update() can match it against a sketch's id.
// 	// const id = Number(req.params.id);
//
// 	// TODO (lab) 2: call sketchData.update(id, req.body) and keep
// 	// whatever it returns.
// 	// const updated = sketchData.update(id, req.body);
//
// 	// TODO (lab) 3: sketchData.update() returns null if no sketch had
// 	// that id. Follow the 400 pattern in the POST route above — here
// 	// the right status is 404 (Not Found), not 400, because the
// 	// REQUEST was fine, there just wasn't a sketch with that id.
// 	// if (!updated) {
// 	// 	return res.status(404).json({ error: `No sketch found with id ${id}` });
// 	// }
// 	// res.json(updated);
// });
//
// TIP: the shape of this route is almost identical to the POST route
// above — same try/catch, same "check the result, respond accordingly"
// structure. Reuse that pattern rather than inventing a new one.
//
// STRETCH: once PATCH works, write the matching DELETE route yourself
// (sketchData.remove(id) is already there, same idea again). A
// DELETE route has no body to send back on success — look up what
// status code means "it worked, there's nothing more to say" (204).

app.listen(PORT, () => {
	console.log(`Sketch Gallery API listening on http://localhost:${PORT}`);
	console.log(`Try it: http://localhost:${PORT}/api/sketches`);
});
