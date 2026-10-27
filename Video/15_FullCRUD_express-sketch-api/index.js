/**
 * index.js — the standalone Sketch Gallery API.
 * ------------------------------------------------------------------
 * THIS IS A COMPLETELY SEPARATE APP from the SvelteKit project
 * (16_FullCRUD_sveltekit-sketch-gallery). It has its own package.json, its
 * own port, and its own `npm run dev`. It has never heard of Svelte
 * and doesn't need to.
 *
 * FULL CRUD VERSION: all four operations are wired up here (the PATCH
 * and DELETE routes that are a lab exercise in demo 15 are finished).
 * Data lives in a plain array in memory, so it resets on every restart.
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
// The URL says WHICH sketch (the :id part); the JSON body says WHAT to change,
// e.g. { "favourite": true }. Same shape as the POST route above: guard the
// body, call ONE sketchData function, answer with the right status code.
app.patch('/api/sketches/:id', (req, res) => {
	try {
		// Everything in a URL arrives as text, so "2" has to become the
		// number 2 before it can match a sketch's id. (If it is not a
		// number at all we get NaN, nothing matches, and we answer 404.)
		const id = Number(req.params.id);

		// Same guard as POST: no Content-Type header means req.body is
		// undefined, not {}.
		if (!req.body) {
			return res.status(400).json({ error: 'a JSON body of changes is required' });
		}

		const updated = sketchData.update(id, req.body);

		// 404 = Not Found: the request itself was fine, there just was
		// no sketch with this id to change. update() gives back null
		// when that happens.
		if (!updated) {
			return res.status(404).json({ error: `No sketch found with id ${req.params.id}` });
		}

		res.json(updated);
	} catch (err) {
		console.error('Failed to update sketch:', err.message);
		res.status(500).json({ error: 'Could not update sketch' });
	}
});

// --- DELETE /api/sketches/:id — remove a sketch ------------------------------
app.delete('/api/sketches/:id', (req, res) => {
	try {
		const id = Number(req.params.id);

		// remove() gives back true if it removed something, false if no
		// sketch had that id.
		const wasRemoved = sketchData.remove(id);

		if (!wasRemoved) {
			return res.status(404).json({ error: `No sketch found with id ${req.params.id}` });
		}

		// 204 = No Content: it worked, and there is nothing more to say.
		// The sketch is gone, so there is nothing left to send back.
		res.status(204).send();
	} catch (err) {
		console.error('Failed to delete sketch:', err.message);
		res.status(500).json({ error: 'Could not delete sketch' });
	}
});

app.listen(PORT, () => {
	console.log(`Sketch Gallery API listening on http://localhost:${PORT}`);
	console.log(`Try it: http://localhost:${PORT}/api/sketches`);
});
