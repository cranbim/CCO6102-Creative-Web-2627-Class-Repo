# 16 — SvelteKit Sketch Gallery

**Week 5, Track 1.** A SvelteKit app that talks to `15-express-sketch-api`
— server-to-server only, never directly from the browser. Demonstrates
`load`, error handling, and forwarding a POST through to Express.

## Creating this project from scratch

This project was created with:

```bash
npx sv create 16-sveltekit-sketch-gallery --template minimal --no-types --no-add-ons --install npm
```

What each flag means: `--template minimal` skips the demo counter app;
`--no-types` means plain JavaScript, no TypeScript, no JSDoc type
comments (consistent with every demo this project uses, except 12b and
14); `--no-add-ons` skips ESLint/Prettier/Playwright prompts, which this
module doesn't teach; `--install npm` installs dependencies immediately
so the project is ready to run.

## What this demonstrates

- A `load` function fetching from an *external* server (our own Express
  API, not a route inside this app)
- **Real error handling** for when that fetch fails — the `error()`
  helper and a custom `+error.svelte`, not SvelteKit's generic default
- Forwarding a form submission through a SvelteKit `+server.js` route to
  Express (Create)
- Reading the Express API's base URL from `.env`, the SvelteKit 3 way
  (`src/env.js` + `defineEnvVars`, imported from `$app/env/private`)

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

**Required step — copy the example env file:**

```bash
cp .env.example .env
```

`.env` is deliberately **not** committed; `.env.example` is, with the
one variable this project needs (`SKETCH_API_URL`). If you skip this
step, SvelteKit refuses to start at all — see "Why is the base URL in
an env var?" below for exactly what that looks like and why.

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

Restart Express (`npm run dev` again in its terminal) and reload — the
gallery comes back.

### 2. POST — the form

Fill in the "Add a sketch" form on `/gallery` and submit. Open dev tools
first so students can see the request going to `/api/sketches` — **this
app's own domain**, not Express's port 3001. That request lands in
`src/routes/api/sketches/+server.js`, which forwards it to Express using
the `createSketch()` helper in `src/lib/server/sketchApi.js`.

## Why is the base URL in an env var?

`SKETCH_API_URL` isn't hardcoded as `http://localhost:3001` inside the
code — it's declared once in `src/env.js` (think of this file as a
"guest list": only variables named here can be imported at all) and
imported from `$app/env/private` wherever it's needed. Right now that's
mostly about tidiness (one place to change the port). It becomes properly
useful later: when this gets deployed (deferred to Week 6 — see the Week
5 assumptions block and `Week_6_Notes.md`), this same variable just points
at a real Railway URL instead, with no code changes needed anywhere.

**Note the `private` in `$app/env/private`:** this env var is only ever
readable from server-side code (`+page.server.js`, `+server.js`). If you
tried to import it into a `.svelte` component, SvelteKit would refuse to
build — that's the framework enforcing the same "server-side only" rule
this week keeps coming back to.

**If `.env` is missing or the variable is misspelled**, SvelteKit won't
start a mysterious half-broken app — it stops immediately with an
`env_invalid` error naming the exact variable that's missing. Worth
showing deliberately once, so the error is recognised later rather than
causing panic.

## What we left out (deliberately)

- **No CORS** — the browser never talks to Express directly, so the real
  CORS conversation is sidestepped this week, not solved.
- **No Mongo / real persistence** — `sketchData.js` on the Express side
  is a plain array that resets on restart. Week 6 replaces it.
- **No `$effect`** — not taught yet. The gallery's local sketch list uses
  only `$state`, seeded once from `load`'s data.
- **No form actions / `use:enhance`** — plain `fetch()` is used instead,
  consistent with the pattern used since Week 1.

## Lab exercise (PATCH — wiring the favourite toggle)

| Step | File | What to do |
|---|---|---|
| 1 | `src/lib/server/sketchApi.js` | Add an `updateSketch(id, changes)` function. Copy `createSketch()` just above it; change the method to `'PATCH'` and the URL to include the id. |
| 2 | `src/routes/api/sketches/[id]/+server.js` | Write the `PATCH` handler. Copy the pattern from `../+server.js`'s `POST` handler; read `id` from `params` (remember: `Number(params.id)`, it arrives as a string) instead of nothing, and call your new `updateSketch()` instead of `createSketch()`. |
| 3 | `src/routes/gallery/+page.svelte` | Finish `toggleFavourite()`. Copy the shape of `handleSubmit()`; `fetch()` your new route with `method: 'PATCH'`. |

Each TODO comment cross-references the others — start wherever feels
natural and follow the thread.

**Stretch:** once PATCH works, give the `[id]/+server.js` route a proper
404 response when `updateSketch()` comes back empty, the same way
`15-express-sketch-api`'s own PATCH/DELETE routes already do.

## Further reading

- [SvelteKit — Errors](https://svelte.dev/docs/kit/errors) — the `error()`
  helper and `+error.svelte`, this week's core new idea.
- [SvelteKit — Environment variables](https://svelte.dev/docs/kit/environment-variables)
  — `defineEnvVars`, `$app/env/private` / `$app/env/public`.
- [SvelteKit — Routing: +server.js](https://svelte.dev/docs/kit/routing#server)
  — what a `+server.js` file is and which exports it accepts.

## Verification notes

Built with `npm run build` (0 errors) and checked with `npm run check`
(`svelte-check`) on Node 22.22.0 / Svelte 5.57.1 / SvelteKit 3.1.0 / Vite
8.3.5, 22 Oct 2026. **0 errors, 1 warning**: `state_referenced_locally`
on `let sketches = $state(data.sketches)` — expected and accepted (see
`Week5_Review_Steps3_4.md`), not a bug; fixing it would mean reaching for
`$effect`, which isn't taught.

End-to-end tested against a **real running `npm run dev` server**
(not just a build check), with `15-express-sketch-api` running alongside
it on its own port:

- `GET /` → 200
- `GET /gallery` (Express running) → loads and lists all four seeded
  sketches correctly
- `POST /api/sketches` (via this app's form-equivalent request) →
  forwards to Express, returns `201` with the new sketch, confirmed
  present on Express's own `/api/sketches` afterward
- `GET /gallery` (Express stopped) → `HTTP 502`, custom error page
  renders with the exact expected message — the error-handling teaching
  moment confirmed to actually work, not just look right in the code
- Missing `.env` → confirmed SvelteKit refuses to start with an
  `env_invalid` error naming `SKETCH_API_URL`

**Not tested:** the PATCH lab exercise itself (intentionally unsolved —
see `lab-solution-reference` in `15-express-sketch-api` for the
equivalent on the Express side; this project has no separate tutor
solution file yet, since the lab spans three files end-to-end — build
one before teaching if you want to hand-trace it rather than reason
through it live).
