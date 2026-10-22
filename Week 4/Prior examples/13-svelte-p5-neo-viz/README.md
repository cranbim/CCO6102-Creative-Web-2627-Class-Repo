# 13 — p5 + NeoWs generative visualisation

Week 4, Track 2. Extends `12-sveltekit-neo-proxy`'s proxy pattern into a
creative payoff: a p5 sketch driven by live asteroid data.

## Setup

```bash
npm install
npm run dev -- --open
```

Same `.env` setup (and the same `src/env.js` declaration) as `12-sveltekit-neo-proxy` — see that project's README
for details. This project ships its own independent copy of the proxy
route (`src/routes/api/neo/+server.js` and `src/lib/server/neo.js`) so it
runs standalone; it isn't literally wired to project 12's server.

## The three pages

- **`/before`** — the sketch rendering random placeholder data, so
  there's something on screen before real data is wired up.
- **`/after`** — driven by live NeoWs data via a **`load` function**
  (`src/routes/after/+page.server.js`), not a client-side fetch. Data is
  ready before the page renders — no loading state. This is the
  worked example of "when you'd choose `load`" from
  `12-sveltekit-neo-proxy`'s README: a visualisation that always needs
  its data as soon as the page loads, with no user-triggered fetch
  involved. Mapping:
  - **size** = diameter
  - **colour** (green → red) = the server-computed danger score
  - **orbit radius** = miss distance (closer approaches sit nearer the
    centre)
  - **orbit speed** = relative velocity
- **`/lab`** — deliberately uses the OTHER pattern: manual `fetch()` to
  a `+server.js` endpoint (`/api/neo`), for contrast practice. TODO in
  `src/lib/LabSketch.svelte`: every asteroid also carries a `hazardous`
  boolean that isn't mapped to anything visual yet. Stretch challenge:
  add a threshold control (e.g. a range slider) to filter or fade
  asteroids by danger score or size.

## Reused from project 12

The danger-score formula is identical to `12-sveltekit-neo-proxy` — same
teaching point (hidden logic, not just a hidden key), now feeding a
creative visual rather than a text list. If you change the formula in
one project during teaching, consider whether to mirror the change in
the other for consistency.

## p5 wiring notes

`src/lib/AsteroidSketch.svelte` wires p5 in instance mode via
`onMount`/`onDestroy`, matching the pattern from Weeks 1 & 3's p5 demos.
The `asteroids` prop is read directly inside the `draw()` closure each
frame — no manual mirroring into a separate variable is needed, since p5's
draw loop just re-reads the current prop value on every call.

p5's auto-generated TypeScript types don't expose a proper class shape
for the sketch instance parameter, so JSDoc annotations for it use a
plain `any` rather than fighting the type checker — reasonable given
TypeScript is explicitly out of scope for this module's curriculum.

## Verified

Migrated to SvelteKit 3 on 6/10/26 (Node 22.22, Svelte 5.57, SvelteKit
3.0.1, Vite 8.3.3, p5 2.3.4): `$lib` → `#lib`, `$env/dynamic/private` →
`src/env.js` + `$app/env/private`. Builds clean and `svelte-check`
passes with zero errors.

**Please re-test locally before teaching:** `/after` (load) and `/lab`
(+server.js) rendered real asteroids on SvelteKit 2 (1/9/26) and the
logic is unchanged, but the build sandbox can't reach `api.nasa.gov`, so
the migrated versions haven't been seen rendering live data.
