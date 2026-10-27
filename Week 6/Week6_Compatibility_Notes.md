# Week 6 compatibility notes — 16-sveltekit-sketch-gallery & 17-svelte-p5-sketch-viz

*What was actually checked against your real Week 5 code (Step 2b, 7/9/26),
and the one real fix needed. Everything else: confirmed working unchanged,
not assumed.*

## Confirmed working with zero changes

Built and ran both projects for real against a Mongoose-shaped data source
(see the note at the bottom on how, given no live Atlas access here), then
hit their actual routes over real HTTP:

- **`16-sveltekit-sketch-gallery`**: `/gallery` renders all four sketches
  correctly — the `{#each sketches as sketch (sketch.id)}` keyed block
  works fine against a string `id`, no changes needed. The POST form
  (`handleSubmit` → `/api/sketches` → `sketchApi.js`'s `createSketch()`)
  round-trips a real create correctly — confirmed the new sketch appears
  on an immediate reload (the actual READ/CREATE persistence effect this
  week's teaching leans on).
- **`17-svelte-p5-sketch-viz`**: both `/viz` and `/lab` render correctly.
  This project never touches `id` at all (only `title`/`colorTag`/
  `favourite`), so it was never at risk here.
- **Only your `.env`'s `SKETCH_API_URL` needs to change** — point it at
  wherever `18-express-mongo-api` ends up running (same port, 3001, if you
  keep the default — see that project's own README).

## One real fix needed — the PATCH lab's scaffold comment

`16-sveltekit-sketch-gallery/src/routes/api/sketches/[id]/+server.js`
still has the PATCH route as an unfinished lab exercise (as shipped), with
this hint in the comments:

```js
// TODO (lab):
// const id = Number(params.id);   // <-- this line
// const changes = await request.json();
// const updated = await updateSketch(id, changes);
// return json(updated);
```

`Number(params.id)` was correct for Week 5's plain integer ids (`1`, `2`,
`3`...). It silently breaks against MongoDB's string ObjectIds — confirmed
directly: `Number('665f1b2c9a1e4a0012ab34cd')` → `NaN`, which then fails
the lookup and returns a 500.

**The fix** (one line, whether a student completes this in Week 5 using
the current hint, or completes it fresh in Week 6):

```js
// const id = params.id;   // <-- just use the string directly, no Number()
```

Tested end-to-end with this fix applied (a full `updateSketch()` added to
`sketchApi.js`, the route wired, a real PATCH request sent) — works
cleanly, confirmed against a real Mongoose-shaped id.

**Worth raising directly in class**, per the outline tab's row 16 note: if
anyone already finished this lab in Week 5 following the original hint
literally, their PATCH route will break the moment it's pointed at the new
API — better to name that upfront than let it surface as a confusing bug
mid-session.

## Cosmetic only, not required

`sketchApi.js`'s `Sketch` JSDoc typedef still says `@property {number} id`
— harmless (just an editor/type-checking hint, not runtime behaviour) but
now inaccurate. Worth updating to `{string} id` next time that file's
touched, no urgency.

## How this was actually verified (no live Atlas in this sandbox)

Real Mongoose `Document` instances (which generate genuine, unique
ObjectIds the moment you `new Sketch(data)` — no live database connection
needed for that part) backed by a plain in-memory array, served over real
HTTP on the same port your `.env` already points at. This gives real
Mongo-shaped JSON — `_id`, the `id` virtual, `createdAt`/`updatedAt` — to
build and preview both SvelteKit projects against for real, without
needing network access to Atlas (blocked in this sandbox — see
`18-express-mongo-api/README.md` for the full explanation). A genuine
Atlas round-trip is still worth Dave's own pass before teaching, though
nothing found here suggests it would behave differently.
