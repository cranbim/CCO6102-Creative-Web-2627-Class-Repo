// TUTOR-ONLY REFERENCE — the finished version of the lab (row 16).
// Same base schema as ../../models/Sketch.js, with the one new field a
// student would add themselves: a simple 1-5 numeric rating.
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const sketchSchema = new Schema(
	{
		title: { type: String, required: true },
		artist: { type: String, required: true },
		colorTag: { type: String, required: true },
		favourite: { type: Boolean, default: false },
		// <-- the lab's one new field
		rating: { type: Number, min: 1, max: 5 }
	},
	{ timestamps: true }
);

const Sketch = model('Sketch', sketchSchema);

export default Sketch;
