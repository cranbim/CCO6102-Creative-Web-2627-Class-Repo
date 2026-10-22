# 12 — SvelteKit `+server.js` proxy demo

Week 4, Track 1. Three pages tell the story of why we go server-side, using
NASA's Near Earth Object Web Service (NeoWs) as the running example.

## Setup

```bash
npm install
npm run dev -- --open
```

No `.env` file is required to get started — the server falls back to
NASA's public `DEMO_KEY` automatically (rate-limited to 30 requests/hour,
fine for a solo run-through; not fine for 20+ students in one lab).

To get a personal key (instant, free, no credit card):
1. Go to https://api.nasa.gov, enter an email, get a key immediately.
2. Copy `.env.example` to `.env` and paste the key in as `NASA_API_KEY`.
3. Restart `npm run dev`.

Personal keys get 1,000 requests/hour — **use a personal key for the
actual class session**, not DEMO_KEY, or the whole cohort will exhaust
the shared 30/hour limit within the first few minutes.

### Environment variables in SvelteKit 3

SvelteKit 3 asks you to **declare** the environment variables your app
uses, in `src/env.js`. `NASA_API_KEY` is declared there, with a schema
that falls back to NASA's public `DEMO_KEY` if your `.env` doesn't set
one. Server code then imports it with
`import {{ NASA_API_KEY }} from '$app/env/private'` — a module SvelteKit
refuses to bundle into browser code, which is what keeps the key secret.
(The older `$env/dynamic/private` module still exists but is deprecated.)
[Environment variables docs](https://svelte.dev/docs/kit/environment-variables)

## The four pages

- **`/naive`** — fetches NeoWs directly from the browser, API key visible
  in the request URL. Open dev tools → Network tab before clicking the
  fetch button.
- **`/load`** — the idiomatic fix: a `load` function
  (`src/routes/load/+page.server.js`) supplies data automatically,
  before the page even renders. No button, no loading state, no
  client-side `fetch()` call at all.
- **`/proxied`** — the same data via a `+server.js` endpoint instead,
  fetched **on demand** when you click a button. This is the explicit
  contrast to `/load` — same hidden key, same hidden "danger score"
  logic, different mechanism, different reason to choose it (see below).
- **`/lab`** — TODO-commented starting point for the in-class/post-study
  exercise: add a `?days=` query parameter to the `+server.js` route.
  Stretch challenge: a second endpoint proxying a different NeoWs query
  (e.g. lookup by asteroid ID).

## `load` vs `+server.js` — when to reach for which

Both `/load` and `/proxied` hide the same key and the same "danger
score" formula — they share the exact same server-side helper
(`src/lib/server/neo.js`). The difference is entirely about **when** the
data-fetching happens and **who** triggers it:

- **`load`** (`+page.js` / `+page.server.js`) — runs automatically as
  part of navigation, server-side by default. Use this when a page
  needs its data as soon as it loads. No loading spinner, SSR-friendly.
  This is what most SvelteKit tutorials and the official docs lead with.
- **`+server.js`** — a genuine API endpoint the client calls with
  `fetch()` whenever it chooses. Use this when the fetch should be
  triggered by something (a button, a search box, a poll), or when more
  than one caller needs to hit the same endpoint.

## Hiding logic, not just keys

`src/lib/server/neo.js` computes a "danger score" from each asteroid's
diameter, velocity, and miss distance. This file lives under
`src/lib/server/`, which SvelteKit treats as server-only — it's
physically impossible to import it from a `+page.svelte` file; the build
will fail if you try. The client only ever receives the *number*, never
the formula that produced it. That's the same idea as hiding an API key,
applied to your own logic instead of a third party's secret.

## CORS — confirmed behaviour

NeoWs does **not** block direct browser requests. Confirmed locally
(1/9/26): `/naive` runs with no CORS warning in the console, and
`/proxied` also returns valid data — both paths genuinely work.

This means the pain demo rests entirely on the **visible key in dev
tools**, not a network error. When teaching the "why go server-side"
generalisation (row 13 of the Week 4 outline), name CORS as a real
pattern students will meet with *other* APIs — don't set up an
expectation that this specific demo will fail live, because it won't.


## Verified

Migrated to SvelteKit 3 on 6/10/26 (Node 22.22, Svelte 5.57, SvelteKit
3.0.1, Vite 8.3.3): `$lib` → `#lib`, `$env/dynamic/private` →
`src/env.js` + `$app/env/private`. Builds clean and `svelte-check`
passes with zero errors. The `/api/neo` route runs and reaches its NASA
call (the build sandbox can't reach `api.nasa.gov`, so a live fetch
returned its expected 502 there).

**Please re-test locally before teaching:** `/naive`, `/load` and
`/proxied` returned valid asteroid data on SvelteKit 2 (1/9/26), and the
fetch logic is unchanged, but nobody has re-run them live since the
migration.
