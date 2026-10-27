# 18-express-mongo-api

Week 6's rewrite of Week 5's `15-express-sketch-api`. Same routes, same
field shapes — `sketchData.js` is the ONLY file whose internals changed
(in-memory array operations -> Mongoose calls against MongoDB Atlas).

## Setup

```bash
npm install
cp .env.example .env
# edit .env: paste in a real MongoDB Atlas connection string
npm run dev
```

Runs on `http://localhost:4000` by default (override with `PORT` in `.env`).

## Routes (unchanged from Week 5)

| Method | Path                  | Calls              |
|--------|-----------------------|---------------------|
| GET    | `/api/sketches`       | `sketchData.getAll()` |
| POST   | `/api/sketches`       | `sketchData.create()` |
| PATCH  | `/api/sketches/:id`   | `sketchData.update()` |
| DELETE | `/api/sketches/:id`   | `sketchData.remove()` |

Try it with curl once `.env` points at a real Atlas cluster:

```bash
curl http://localhost:4000/api/sketches
curl -X POST http://localhost:4000/api/sketches \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","artist":"Me","colorTag":"blue"}'
```

## The lab (row 16)

`models/Sketch.js` has a comment marking where to add one new field
yourself, then wire a small Mongoose-backed query route in `index.js` that
uses it. `lab-solution-reference/` has a worked version (tutor-only — see
its own README) — don't peek until you've had a go.

## What was and wasn't verified building this

Built and tested in a sandboxed environment with **no network access to
MongoDB Atlas or any live MongoDB server** (confirmed directly — even
`mongodb-memory-server`'s binary download was blocked). So, honestly:

**Verified:**
- All files pass `node --check` (syntax).
- `npm install` succeeds clean, `npm test` passes (5 tests in the main
  project, 3 in `lab-solution-reference/` — see below).
- The Express server boots correctly and registers all four routes even
  when Mongo is unreachable.
- **The connection-failure path was tested for real**, against a
  deliberately bad Atlas-shaped URI: the app logs the failure clearly,
  stays up, and a request against it fails cleanly with a catchable error
  rather than crashing the process or hanging indefinitely. This directly
  matters for row 14's "verify the connection live" teaching point.
- Found and fixed a real issue in this process: Mongoose's default
  10-second buffering timeout made a disconnected request hang silently
  for 10s before erroring — a bad live-demo experience. Tightened to 5s
  (`bufferTimeoutMS` + `serverSelectionTimeoutMS`) and re-verified the
  faster, cleaner failure.
- `sketchData.js`'s logic was tested against a **mocked** Mongoose Model
  (see `test/sketchData.test.js`) — confirms each function calls the right
  Mongoose method with the right arguments and handles a not-found result
  correctly. This proves the JS logic is correct; it does NOT prove Atlas
  itself will accept these exact calls.

**NOT verified — needs Dave's own pass before teaching:**
- A real end-to-end round trip against actual MongoDB Atlas (connect,
  create a document, read it back, update it, delete it). The code follows
  the official Mongoose API docs exactly (linked in the outline tab's
  Step 2a resources), but "follows the docs" and "tested against your
  actual cluster" are not the same claim.
- Whether `16-sveltekit-sketch-gallery` and `17-svelte-p5-sketch-viz`
  (Week 5's SvelteKit projects) genuinely work unchanged against this API —
  their actual code wasn't available to test against in this session, only
  the documented contract (routes, field names) they were built to. Worth
  a real run-through before the session, particularly checking whether
  anything on the SvelteKit side assumes the old array's `id` field shape
  rather than MongoDB's `_id`.
