// sketchData.js — Week 6's rewrite of Week 5's in-memory version.
//
// THIS IS THE FILE THAT CHANGES. Every function keeps the exact same name
// and the exact same shape (same params in, same shape out) as Week 5's
// array-backed version. Nothing in index.js or in the SvelteKit app talking
// to this API needs to know that the array became a MongoDB collection —
// that's the whole point of Week 5's encapsulation decision.
//
// Where Week 5 did `sketches.find(s => s.id === id)`, we now ask MongoDB to
// do the finding for us via Mongoose's Model methods.

import Sketch from '../models/Sketch.js';

// READ — was `return [...sketches]` on the array; now a real query.
export async function getAll() {
	return Sketch.find();
}

// CREATE — was `sketches.push(newSketch)`; now a real insert.
export async function create(data) {
	return Sketch.create(data);
}

// UPDATE — was finding-by-id and mutating in place; findByIdAndUpdate does
// both steps as one operation. `new: true` asks Mongoose to hand back the
// UPDATED document (its default is to hand back the one from BEFORE the
// update, which would be a confusing thing to send back to a client that
// just asked to change something).
export async function update(id, changes) {
	return Sketch.findByIdAndUpdate(id, changes, { new: true, runValidators: true });
}

// DELETE — was `sketches.splice(index, 1)`; now a real delete-by-id.
export async function remove(id) {
	return Sketch.findByIdAndDelete(id);
}
