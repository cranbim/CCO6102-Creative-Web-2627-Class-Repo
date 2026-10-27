import 'dotenv/config'; // loads .env into process.env before anything else runs
import express from 'express';
import mongoose from 'mongoose';
import * as sketchData from './lib/sketchData.js';

const app = express();
const PORT = process.env.PORT || 3001; // same default port as Week 5's 15-express-sketch-api

app.use(express.json());

// --- Connecting to Atlas (row 14 of the outline tab) ---------------------
// By default, Mongoose queries made before a connection exists don't fail
// immediately — they "buffer" and wait, for up to 10 seconds, before
// timing out. That's a bad live-teaching experience (a silent 10s hang
// mid-demo, verified while building this). Tightened to 5s here so a
// wrong-password/wrong-URI moment (row 14's optional live failure) fails
// fast and visibly instead.
mongoose.set('bufferTimeoutMS', 5000);

// mongoose.connect() reads the connection string from .env — same .env
// pattern from Week 5, new value. serverSelectionTimeoutMS similarly
// tightens how long the INITIAL connection attempt itself will retry
// before giving up. Deliberately logged clearly on both success and
// failure, since row 14's teaching point is "verify the connection live",
// not just "assume it worked".
mongoose
	.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
	.then(() => console.log('[mongo] connected'))
	.catch((err) => {
		console.error('[mongo] connection FAILED:', err.message);
		// Deliberately not process.exit()-ing here: the server still starts
		// and routes still register, so a wrong-password/wrong-URI moment
		// (row 14's optional live failure demo) produces a real, visible
		// request-time error rather than the process silently dying.
	});

// --- Routes ----------------------------------------------------------------
// Identical routes, identical shapes, to Week 5's 15-express-sketch-api.
// The only thing that changed is what sketchData.js does internally.

app.get('/api/sketches', async (req, res) => {
	try {
		const sketches = await sketchData.getAll();
		res.json(sketches);
	} catch (err) {
		res.status(500).json({ error: 'Could not fetch sketches', detail: err.message });
	}
});

app.post('/api/sketches', async (req, res) => {
	const { title, artist, colorTag } = req.body ?? {};
	if (!title || !artist || !colorTag) {
		return res.status(400).json({ error: 'title, artist and colorTag are all required' });
	}
	try {
		const created = await sketchData.create(req.body);
		res.status(201).json(created);
	} catch (err) {
		res.status(500).json({ error: 'Could not create sketch', detail: err.message });
	}
});

app.patch('/api/sketches/:id', async (req, res) => {
	try {
		const updated = await sketchData.update(req.params.id, req.body);
		if (!updated) return res.status(404).json({ error: 'Sketch not found' });
		res.json(updated);
	} catch (err) {
		res.status(500).json({ error: 'Could not update sketch', detail: err.message });
	}
});

app.delete('/api/sketches/:id', async (req, res) => {
	try {
		const deleted = await sketchData.remove(req.params.id);
		if (!deleted) return res.status(404).json({ error: 'Sketch not found' });
		res.status(204).end();
	} catch (err) {
		res.status(500).json({ error: 'Could not delete sketch', detail: err.message });
	}
});

app.listen(PORT, () => {
	console.log(`[express] 18-express-mongo-api listening on http://localhost:${PORT}`);
});
