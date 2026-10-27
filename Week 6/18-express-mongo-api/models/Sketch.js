// A Mongoose Schema defines the SHAPE of a document — the Mongo equivalent
// of the fields on Week 5's in-memory sketch objects. Nothing here changes
// what a "sketch" looks like to the rest of the app: title, artist,
// colorTag, favourite are exactly the fields Week 5 already used.
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const sketchSchema = new Schema(
	{
		title: { type: String, required: true },
		artist: { type: String, required: true },
		colorTag: { type: String, required: true },
		favourite: { type: Boolean, default: false }
		// LAB (row 16 of the outline tab): add one new field here yourself —
		// e.g. a numeric rating (Number, min/max) — then wire a small
		// Mongoose-backed query route in index.js that uses it (e.g. a sort
		// or a simple filter). See lab-solution-reference/ for one worked
		// example (a `rating` field + a sort-by-rating route) — don't peek
		// until you've had a go yourself.
	},
	{
		// Mongoose-managed createdAt/updatedAt fields — mentioned only in
		// passing in the outline (row 16's "dateAdded" alternative); using
		// the built-in timestamps option instead of a hand-rolled field is
		// the idiomatic Mongoose way to get the same thing, and doubles as
		// worked support for the lab's "sort by newest" stretch option.
		timestamps: true,
		// COMPATIBILITY FIX, found by testing rather than assumed: Mongoose
		// documents only include `_id` in their default JSON output, not
		// `id` — verified directly while building this (see the README's
		// verification section). Week 5's array-backed API always returned
		// a plain `id` field, and 16-sveltekit-sketch-gallery almost
		// certainly reads `sketch.id` (e.g. for PATCH/DELETE URLs). Turning
		// on the `id` virtual in JSON output keeps that contract intact
		// without touching the SvelteKit side at all.
		toJSON: { virtuals: true }
	}
);

// A Model is the thing you actually query with — Schema.model('Sketch', ...)
// tells Mongoose to use the "sketches" collection (it lowercases and
// pluralises the name automatically).
const Sketch = model('Sketch', sketchSchema);

export default Sketch;
