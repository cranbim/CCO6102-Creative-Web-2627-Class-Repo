# Lab solution reference — TUTOR ONLY

This is the finished version of row 16's lab: one new schema field
(`rating`), plus one new Mongoose-backed query route.

**Don't hand this to students** — same convention as Week 5's PATCH/DELETE
lab reference. It exists so Dave can check a student's approach, or unblock
someone who's stuck, not as a starting file.

## What's different from the main project

- `models/Sketch.js` — adds a `rating` field (`Number`, `min: 1, max: 5`).
- `lib/sketchData.js` — adds `getAllSorted(field)`, restricted to an
  allow-list of sortable fields (`rating`, `createdAt`) so the route can't
  be used to inject an arbitrary Mongo sort key from the query string.

## The route wiring (add this to `index.js`)

```js
app.get('/api/sketches', async (req, res) => {
	try {
		const { sort } = req.query;
		const sketches = sort ? await sketchData.getAllSorted(sort) : await sketchData.getAll();
		res.json(sketches);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});
```

This REPLACES the plain `GET /api/sketches` handler — same route, now
sort-aware. `GET /api/sketches` still works exactly as before (no `sort`
param -> `getAll()`, unchanged); `GET /api/sketches?sort=rating` is the new
behaviour.

## Verified

`node --test test/` (mocked-model logic check, same approach and same
caveat as the main project — see the top-level README's verification
section). Confirms: `getAllSorted('rating')` calls
`Sketch.find().sort({ rating: -1 })`; `getAllSorted('notarealfield')`
throws before touching Mongoose at all, so a bad `?sort=` value returns a
clean `400`, not a confusing Mongo-level error.
