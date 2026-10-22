# 15 — Express Sketch Gallery API

**Week 5, Track 1.** A standalone Express server — a genuinely separate app
from the SvelteKit project, not a route inside it. This is "the big mental
leap" of the week: two independent Node processes, talking to each other
over plain HTTP, same as any client/server pair.

## Creating this project from scratch

This is a plain Node/Express project, not a SvelteKit one, so there's no
`sv create` step:

```bash
mkdir 15-express-sketch-api && cd 15-express-sketch-api
npm init -y
npm install express
npm install --save-dev nodemon
```

Then add `"type": "module"` to `package.json` (so `import`/`export`
syntax works), and a `dev` script that runs `nodemon index.js`.

## What this demonstrates

- Building an Express API from scratch (`app.get`, `app.post`, `express.json()`)
- **CRUD**, introduced by name (Create / Read / Update / Delete)
- Encapsulating data access behind a small `sketchData.js` module, so the
  routes never touch the data structure directly (see "Why the
  sketchData module?" below)
- Running Node as a standalone long-running server process — a third hat
  for Node, distinct from the dev-tool hat and the "runs our own SvelteKit
  server routes" hat from Week 4
- `try`/`catch` in every route handler, and status codes chosen and
  justified by comment (`400`, `201`, `404`, `500`) — the same habit
  this week establishes on the Express side that `+server.js` already
  established on the SvelteKit side in Week 4

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

## What we left out (deliberately)

- **No real persistence** — see below; a restart wipes everything POSTed
  or PATCHed in class.
- **No request validation library** — the 400 checks are three plain
  `if` conditions, not a schema. That's enough for four fields; it
  wouldn't scale past this demo, and that's fine for a demo.
- **No auth** — anyone who can reach port 3001 can POST/PATCH/DELETE.
  Not a concern for a local teaching demo; would matter the moment this
  deploys anywhere real.

## Lab exercise (PATCH)

| Step | What to do |
|---|---|
| 1 | Add a route to `index.js` listening for `PATCH /api/sketches/:id`. |
| 2 | Read `id` from `req.params` — remember to convert it with `Number()`, it arrives as a string. |
| 3 | Guard against a missing body the same way the POST route above does (`if (!req.body) {...}`), then read the changes from `req.body`. |
| 4 | Call `sketchData.update(id, changes)` and keep what it returns. |
| 5 | If it returned `null` (no sketch had that id), respond `404`. Otherwise send the updated sketch back as JSON. |

There's a TODO comment block in `index.js` showing exactly where this
goes, and the POST route just above it is the pattern to copy.

**Stretch challenge (DELETE):** write the matching `DELETE
/api/sketches/:id` route yourself, using the already-working
`sketchData.remove(id)` — same shape again, but a successful delete has
nothing to send back (look up which status code means exactly that: it
worked, there's nothing more to say).

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

## Further reading

- [Express — Routing](https://expressjs.com/en/guide/routing.html) — the
  `app.get`/`app.post`/`app.patch`/`app.delete` shapes used throughout.
- [MDN — HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
  — for the 400/201/404/500/204 choices made (and justified by comment)
  in this project and its lab solution.

## Verification notes

Built and tested on Node 22.22.0 / Express 5.3.0, 22 Oct 2026, after this
pass to match the plain-code style guide. Every route handler now has an
explicit `try`/`catch` (not present before this pass).

Tested directly against a real running `node index.js` server with
`curl`:

- `GET /api/sketches` → 200, four seeded sketches
- `POST` with a valid body → 201, new sketch returned with assigned id
- `POST` with a field missing → 400
- `POST` with **no body and no `Content-Type` header at all** → **400**,
  not a crash. This edge case wasn't handled by the original `req.body
  ?? {}` version (removed as part of the style-guide pass) — without a
  `Content-Type` header, `express.json()` leaves `req.body` as
  `undefined` rather than `{}`, which crashed the destructure. Caught by
  actually testing a bare `curl -X POST` with no flags, not just the
  happy path. Fixed with an explicit `if (!req.body)` check instead of
  reintroducing `??`.
- `lab-solution-reference/index-with-patch-delete.js`: `PATCH` (success,
  no-body-400, unknown-id-404) and `DELETE` (success-204,
  unknown-id-404) all re-tested after the same fix was applied there.
