# 17 — Sketch Gallery p5 Visualisation

**Week 5, Track 2.** Extends the pattern from Week 4's
`13-svelte-p5-neo-viz`, but the data comes from the class's own Express
API (`15-express-sketch-api`) instead of NASA's NeoWs. Same `load`
mechanism, different data source — that's the whole teaching point.

## Creating this project from scratch

```bash
npx sv create 17-svelte-p5-sketch-viz --template minimal --no-types --no-add-ons --install npm
npm install p5 --prefix 17-svelte-p5-sketch-viz
```

Same flags and reasoning as `16-sveltekit-sketch-gallery`'s README —
plain JS, no add-ons prompts, dependencies installed immediately.

## Before the session

**Run `15-express-sketch-api` first** (this project reads the SAME
running instance Track 1 uses — not its own copy):

```bash
cd ../15-express-sketch-api
npm install
npm run dev
```

Then, in a second terminal:

```bash
cd 17-svelte-p5-sketch-viz
npm install
```

**Required step — copy the example env file:**

```bash
cp .env.example .env
```

Same reasoning as `16-sveltekit-sketch-gallery`: `.env.example` is
committed, `.env` is not, and skipping this step means SvelteKit refuses
to start at all (an `env_invalid` error naming `SKETCH_API_URL`).

## Running it

```bash
npm run dev -- --open
```

Two routes:

- **`/viz`** — the finished demo
- **`/lab`** — the same starting point, with the lab TODO

## What this demonstrates

- `load` (`+page.server.js`) fetching from an external server — same
  idiomatic default taught in Track 1's row 15 segment, now with a
  creative payoff instead of a table of data
- p5 in **instance mode**, static import, wired via `onMount`/`onDestroy`
  — same pattern as Weeks 1, 3, and Week 4's asteroid visualisation
- The mapping: **colour** ← `colorTag`, **size + ring** ←
  `favourite === true`, **label** ← `title`
- Reading `SKETCH_API_URL` from `.env` the SvelteKit 3 way (`src/env.js`
  + `defineEnvVars`, imported from `$app/env/private`) — same convention
  as `16-sveltekit-sketch-gallery`

## The full-circle moment

This project deliberately points at the *same* Express instance as
`16-sveltekit-sketch-gallery`, not an independent copy. Add a sketch via
Track 1's form, then reload `/viz` here — it appears. Worth calling out
live if the timing allows: both tracks are reading and writing the same
data, through two completely different front ends.

## What we left out (deliberately)

- **No write access** — this project only ever calls `fetchSketches()`.
  Adding or editing a sketch always happens via Track 1's form.
- **No animation** — the favourite ring is a static visual flag, not
  (yet) a pulse. That's the stretch challenge below.
- **No independent Express instance** — see "the full-circle moment"
  above; this is intentional, not an oversight.

## Lab exercise

| Step | Where | What to do |
|---|---|---|
| 1 | `src/routes/lab/+page.svelte`, inside the `sketches.forEach` loop | Map the `artist` field. It exists on every sketch object but isn't drawn anywhere yet. A second line of text under the title is the obvious option (the TODO comment shows exact coordinates), but any visual treatment is fair game. |
| STRETCH | same file, after the loop | Animate the favourite ring — it's currently static. `p.draw()` already runs on a loop (~60fps), so anything driven by `p.frameCount` (e.g. `p.sin(p.frameCount * 0.05)`) will animate for free. |

`/viz` is left untouched as the reference version — compare against it
if you want to check your work in `/lab`. No separate tutor-solution file
for this lab: it's a single small addition inside an existing loop,
short enough to talk through live rather than hand-trace from a file.

## p5 import — static, matching the established pattern

`import p5 from 'p5'` at the top of the file, `onMount(() => {...})`
(not `async`) — same shape as the very first p5 demo in Week 1. An
earlier draft of this project used a dynamic `await import('p5')` inside
an async `onMount`, based on an assumption that p5 would crash
SvelteKit's server-side render otherwise. That assumption turned out to
be wrong for this p5 version — checked against Dave's own Week 1
reference code, then confirmed directly: a real SSR request to `/viz`
renders cleanly with the static import, no `window is not defined`
error, no special handling needed. Fixed to match the established
pattern.

## Further reading

- [SvelteKit — Environment variables](https://svelte.dev/docs/kit/environment-variables)
  — `defineEnvVars`, `$app/env/private` / `$app/env/public`.
- [p5.js — Instance mode](https://p5js.org/reference/#/p5/p5) — the `p5`
  constructor used in `onMount` above; search the page for "Global and
  instance mode" for the background on why instance mode is used here.

## Verification notes

`npm run check` (`svelte-check`): **0 errors, 0 warnings**, on Node
22.22.0 / Svelte 5.57.1 / SvelteKit 3.1.0 / Vite 8.3.5 / p5 2.3.4, 22 Oct
2026. `npm run build`: succeeds (the only build output is p5's own
chunk-size notice, not an error).

End-to-end tested against a **real running `npm run dev` server** (not
just a build check), with `15-express-sketch-api` running alongside it:

- `GET /` → 200
- `GET /viz` → 200, server-rendered HTML includes the seeded sketch
  titles (confirmed "Pulse Grid" present in the raw response) — real
  proof the `load` → p5 data pipeline works, not just that the page
  loads
- `GET /lab` → 200
- No `window is not defined` or other SSR error appeared in the dev
  server's log for either route — the static p5 import genuinely does
  not break server rendering with this p5 version

**Not tested:** the lab TODO and stretch challenge are intentionally
unsolved in this project (no reference solution shipped — see "Lab
exercise" above for why), and the favourite-toggle round trip (toggle on
`16-sveltekit-sketch-gallery`'s lab, confirm the ring changes here) was
not re-verified after this pass, since it depends on that project's own
PATCH lab rather than on anything in this one.
