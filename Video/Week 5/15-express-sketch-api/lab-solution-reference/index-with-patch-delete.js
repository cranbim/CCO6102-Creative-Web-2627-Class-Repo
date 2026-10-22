/**
 * TUTOR-ONLY REFERENCE — NOT part of the taught demo.
 * ------------------------------------------------------------------
 * This is what index.js looks like with the PATCH lab exercise and
 * DELETE stretch challenge solved. It exists so Dave can see the
 * intended shape of the finished lab before teaching it, and so a
 * stuck student can be pointed at "you're on the right track" rather
 * than the full answer.
 *
 * Not shipped to students by default — same convention as prior weeks
 * (e.g. Week 3's S2a checkpoint exemplar).
 * ------------------------------------------------------------------
 */

import express from 'express';
import * as sketchData from '../lib/sketchData.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/api/sketches', (req, res) => {
	try {
		res.json(sketchData.getAll());
	} catch (err) {
		console.error('Failed to read sketches:', err.message);
		res.status(500).json({ error: 'Could not read sketches' });
	}
});

app.post('/api/sketches', (req, res) => {
	try {
		// See index.js for why this check comes first: a request with
		// no Content-Type header leaves req.body undefined rather than {}.
		if (!req.body) {
			return res.status(400).json({ error: 'title, artist and colorTag are all required' });
		}

		const { title, artist, colorTag } = req.body;
		if (!title || !artist || !colorTag) {
			return res.status(400).json({ error: 'title, artist and colorTag are all required' });
		}
		const newSketch = sketchData.create({ title, artist, colorTag });
		res.status(201).json(newSketch);
	} catch (err) {
		console.error('Failed to create sketch:', err.message);
		res.status(500).json({ error: 'Could not create sketch' });
	}
});

// --- PATCH /api/sketches/:id — the lab exercise, solved ---------------------
app.patch('/api/sketches/:id', (req, res) => {
	try {
		const id = Number(req.params.id);
		// Same guard as the POST route above — a request with no
		// Content-Type header leaves req.body undefined, not {}.
		if (!req.body) {
			return res.status(400).json({ error: 'a JSON body of changes is required' });
		}
		const updated = sketchData.update(id, req.body);

		// 404 = Not Found: the request itself was fine, there just
		// wasn't a sketch with this id to update.
		if (!updated) {
			return res.status(404).json({ error: `No sketch found with id ${id}` });
		}
		res.json(updated);
	} catch (err) {
		console.error('Failed to update sketch:', err.message);
		res.status(500).json({ error: 'Could not update sketch' });
	}
});

// --- DELETE /api/sketches/:id — the stretch challenge, solved ---------------
app.delete('/api/sketches/:id', (req, res) => {
	try {
		const id = Number(req.params.id);
		const wasRemoved = sketchData.remove(id);

		if (!wasRemoved) {
			return res.status(404).json({ error: `No sketch found with id ${id}` });
		}

		// 204 = No Content: it worked, and there's nothing more to say —
		// the sketch is gone, so there's nothing left to send back.
		res.status(204).send();
	} catch (err) {
		console.error('Failed to delete sketch:', err.message);
		res.status(500).json({ error: 'Could not delete sketch' });
	}
});

app.listen(PORT, () => {
	console.log(`[REFERENCE] Sketch Gallery API (with PATCH/DELETE) on http://localhost:${PORT}`);
});
