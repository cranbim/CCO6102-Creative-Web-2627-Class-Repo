// TUTOR-ONLY REFERENCE — the finished version of the lab (row 16).
// Identical to ../../lib/sketchData.js, plus one new function: getAllSorted(),
// a small Mongoose-backed query the in-memory Week 5 version never needed —
// sorting is trivial in Mongo (the database does the work), where the
// in-memory array would have needed a manual .sort() in JS.
import Sketch from '../models/Sketch.js';

export async function getAll() {
	return Sketch.find();
}

// The lab's new query: GET /api/sketches?sort=rating
// `-1` sorts descending (highest rating first) — Mongo's convention, not
// something Week 5's array version had an equivalent of.
export async function getAllSorted(field) {
	const sortableFields = ['rating', 'createdAt'];
	if (!sortableFields.includes(field)) {
		throw new Error(`Cannot sort by '${field}'`);
	}
	return Sketch.find().sort({ [field]: -1 });
}

export async function create(data) {
	return Sketch.create(data);
}

export async function update(id, changes) {
	return Sketch.findByIdAndUpdate(id, changes, { new: true, runValidators: true });
}

export async function remove(id) {
	return Sketch.findByIdAndDelete(id);
}
