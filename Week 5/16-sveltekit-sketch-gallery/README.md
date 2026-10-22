# 16 — SvelteKit Sketch Gallery

**Week 5, Track 1.** A SvelteKit app that talks to `15-express-sketch-api`
— server-to-server only, never directly from the browser. Demonstrates
`load`, error handling, and forwarding a POST through to Express.

## What this demonstrates

- A `load` function fetching from an *external* server (our own Express
  API, not a route inside this app)
- **Real error handling** for when that fetch fails — the `error()`
  helper and a custom `+error.svelte`, not SvelteKit's generic default
- Forwarding a form submission through a SvelteKit `+server.js` route to
  Express (Create)
- Reading the Express API's base URL from `.env`

## Before the session

**Run `15-express-sketch-api` first, in its own terminal:**

```bash
cd ../15-express-sketch-api
npm install
npm run dev
```

Then, in a **second terminal**, this project:

```bash
cd 16-sveltekit-sketch-gallery
npm install
```

An `.env` file is already included (pointing at `http://localhost:3001`)
so nothing needs configuring before the session.

## Running it

```bash
npm run dev -- --open
```

Two terminals, two `npm run dev` commands, two ports — that's genuinely
new this week (see the outline's assumption about running two servers at
once). Get comfortable saying this out loud in class rather than assuming
it's obvious.

## Live teaching flow (matches the outline tab, Track 1)

### 1. `load` + the pain of a down server

Visit **http://localhost:5173/gallery** with Express running — the list
loads with no button, no spinner, no client-side `fetch()` at all. That's
the `load` function in `src/routes/gallery/+page.server.js`.

Then — **live, not staged** — go to the Express terminal and hit `Ctrl-C`.
Reload `/gallery`. You'll land on the custom error page
(`src/routes/+error.svelte`) with a clear, specific message, not
SvelteKit's blank default. Walk through why: `+page.server.js` wraps the
fetch in a `try/catch` and calls SvelteKit's `error()` helper.

**Verified live (2/9/26):** with Express stopped, `/gallery` returns
`HTTP 502` and renders "Couldn't reach the Sketch Gallery API. Is
15-express-sketch-api running on port 3001?" — confirmed working exactly
as designed, not just in theory.

Restart Express (`npm run dev` again in its terminal) and reload — the
gallery comes back.

### 2. POST — the form

Fill in the "Add a sketch" form on `/gallery` and submit. Open dev tools
first so students can see the request going to `/api/sketches` — **this
app's own domain**, not Express's port 3001. That request lands in
`src/routes/api/sketches/+server.js`, which forwards it to Express using
the `createSketch()` helper in `src/lib/server/sketchApi.js`.

## Why is the base URL in `.env`?

`SKETCH_API_URL` isn't hardcoded as `http://localhost:3001` inside the
code — it's read from `.env` via `$env/static/private`. Right now that's
mostly about tidiness (one place to change the port). It becomes properly
useful later: when this gets deployed (deferred to Week 6 — see the Week
5 assumptions block and `Week_6_Notes.md`), this same variable just points
at a real Railway URL instead, with no code changes needed anywhere.

**Note the `private` in `$env/static/private`:** this env var is only
ever readable from server-side code (`+page.server.js`, `+server.js`).
If you tried to import it into a `.svelte` component, SvelteKit would
refuse to build — that's the framework enforcing the same "server-side
only" rule this week keeps coming back to.

## Lab exercise (PATCH — wiring the favourite toggle)

Three files have TODOs, each pointing at the one before it as the pattern
to copy:

1. **`src/lib/server/sketchApi.js`** — add an `updateSketch(id, changes)`
   function. Copy `createSketch()` just above it; change the method to
   `'PATCH'` and the URL to include the id.
2. **`src/routes/api/sketches/[id]/+server.js`** — write the `PATCH`
   handler. Copy the pattern from `../+server.js`'s `POST` handler; read
   `id` from `params` instead of nothing, and call your new
   `updateSketch()` instead of `createSketch()`.
3. **`src/routes/gallery/+page.svelte`** — finish `toggleFavourite()`.
   Copy the shape of `handleSubmit()`; `fetch()` your new route with
   `method: 'PATCH'`.

Each TODO comment cross-references the others — start wherever feels
natural and follow the thread.

**Stretch challenge (DELETE):** same three-file pattern, using Express's
`DELETE /api/sketches/:id` route (also a TODO — see
`15-express-sketch-api`'s own README).

## Verified

Built with `npm run build` (zero errors) and checked with `svelte-check`
(**0 errors, 0 warnings**) on Node 22.22.2 / Svelte 5.56.1 / SvelteKit
2.63.0 / Vite 8.0.16, 2/9/26.

End-to-end tested against a running `preview` build with
`15-express-sketch-api` alongside it:

- `GET /` → 200
- `GET /gallery` (Express running) → loads and lists sketches correctly
- `POST /api/sketches` (via this app) → forwards to Express, new sketch
  confirmed present on Express's own `/api/sketches` afterward
- `GET /gallery` (Express stopped) → `HTTP 502`, custom error page
  renders with the expected message — the error-handling teaching moment
  confirmed to actually work, not just look right in the code
