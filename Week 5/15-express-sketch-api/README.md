# 15 — Express Sketch Gallery API

**Week 5, Track 1.** A standalone Express server — a genuinely separate app
from the SvelteKit project, not a route inside it. This is "the big mental
leap" of the week: two independent Node processes, talking to each other
over plain HTTP, same as any client/server pair.

## What this demonstrates

- Building an Express API from scratch (`app.get`, `app.post`, `express.json()`)
- **CRUD**, introduced by name (Create / Read / Update / Delete)
- Encapsulating data access behind a small `sketchData.js` module, so the
  routes never touch the data structure directly (see "Why the
  sketchData module?" below)
- Running Node as a standalone long-running server process — a third hat
  for Node, distinct from the dev-tool hat and the "runs our own SvelteKit
  server routes" hat from Week 4

## Before the session

```bash
cd 15-express-sketch-api
npm install
```

That's it — no `.env` needed, no external API, no network access required.
Good one to have running and tested before the room fills up.

## Running it

```bash
npm run dev
```

This starts the server on **http://localhost:3001** (using `nodemon`, so it
restarts automatically if you edit a file — handy for live-coding). Prefer
`npm start` if you'd rather it *not* auto-restart while you're demoing.

Confirm it's alive by visiting **http://localhost:3001/api/sketches**
directly in a browser, or:

```bash
curl http://localhost:3001/api/sketches
```

You should see a JSON array of four sketches.

### ⚠️ Port 3001

The SvelteKit project (`16-sveltekit-sketch-gallery`) expects this API on
port 3001. If that port's busy, either free it or set `PORT=3002 npm run
dev` here **and** update the SvelteKit project's `.env` to match.

## Live teaching flow (matches the outline tab, Track 1)

1. **GET** — show `/api/sketches` working in a browser. This is the whole
   "building a standalone API" payoff moment.
2. **POST** — demo adding a sketch with `curl` or a REST client before
   SvelteKit's form exists yet:
   ```bash
   curl -X POST http://localhost:3001/api/sketches \
     -H "Content-Type: application/json" \
     -d '{"title":"New Piece","artist":"You","colorTag":"#ff00ff"}'
   ```
3. Open `lib/sketchData.js` on screen and walk through **why** it's
   shaped the way it is (see below) — this is a named teaching point, not
   just tidy code.

## Why the sketchData.js module?

Every route in `index.js` is deliberately thin — it just calls
`sketchData.getAll()` or `sketchData.create()` and sends the result back. None of
them touch the `sketches` array directly.

That's not an accident. In **Week 6**, this in-memory array gets replaced
with a real MongoDB collection via Mongoose. When that happens, the plan
is that **only `sketchData.js` changes** — the four function names
(`getAll`, `create`, `update`, `remove`) stay exactly the same, `index.js`
barely changes at all. Worth saying this out loud in class: *"we're
building this so that swapping the database underneath it later is almost
invisible from here."*

## Lab exercise (PATCH)

`sketchData.update(id, changes)` **already exists and works** — it's just not
wired to a route yet. Your task: add a route to `index.js` that:

1. Listens for `PATCH /api/sketches/:id`
2. Reads the `id` from `req.params`
3. Reads the changes from `req.body`
4. Calls `sketchData.update(id, changes)`
5. Sends the result back as JSON — and handles the case where
   `sketchData.update()` returns `null` (no sketch had that id)

There's a TODO comment block in `index.js` showing exactly where this
goes, and the POST route just above it is the pattern to copy.

**Stretch challenge (DELETE):** same idea, using the already-working
`sketchData.remove(id)`. There's a TODO for this too.

**Stuck, or want to check your work?** `lab-solution-reference/` has a
finished version — tutor-only, not meant to be handed to students
up-front, same convention as the Week 3 S2a exemplar.

## Testing PATCH/DELETE once built

```bash
# toggle favourite on sketch id 2
curl -X PATCH http://localhost:3001/api/sketches/2 \
  -H "Content-Type: application/json" \
  -d '{"favourite": true}'

# delete sketch id 3 (stretch)
curl -X DELETE http://localhost:3001/api/sketches/3
```

## A note on persistence (there isn't any)

The `sketches` array in `lib/sketchData.js` resets to its seed data
**every time you restart the server**. Anything POSTed or PATCHed during
class is gone the next time `npm run dev` restarts. Worth naming this
honestly in the session — it's exactly the gap Week 6's MongoDB work
fixes.

## Verified

Built and tested on Node 22.22.2 / Express 5.2.1 (re-verified 2/9/26 after the sketchesStore.js → sketchData.js rename). GET, POST (success and
400-on-missing-field), and the PATCH/DELETE reference solution (success
and 404-on-bad-id) all confirmed working via `curl` on 2/9/26.
