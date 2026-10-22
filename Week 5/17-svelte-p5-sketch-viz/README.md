# 17 — Sketch Gallery p5 Visualisation

**Week 5, Track 2.** Extends the pattern from Week 4's
`13-svelte-p5-neo-viz`, but the data comes from the class's own Express
API (`15-express-sketch-api`) instead of NASA's NeoWs. Same `load`
mechanism, different data source — that's the whole teaching point.

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

## Running it

```bash
npm run dev -- --open
```

Two routes:

- **`/viz`** — the finished demo
- **`/lab`** — the same starting point, with the lab TODOs

## What this demonstrates

- `load` (`+page.server.js`) fetching from an external server — same
  idiomatic default taught in Track 1's row 15 segment, now with a
  creative payoff instead of a table of data
- p5 in **instance mode**, wired via `onMount`/`onDestroy` — same
  pattern as Weeks 1, 3, and Week 4's asteroid visualisation
- The mapping: **colour** ← `colorTag`, **size + ring** ←
  `favourite === true`, **label** ← `title`

## The full-circle moment

This project deliberately points at the *same* Express instance as
`16-sveltekit-sketch-gallery`, not an independent copy. Add a sketch via
Track 1's form, then reload `/viz` here — it appears. Worth calling out
live if the timing allows: both tracks are reading and writing the same
data, through two completely different front ends.

## Lab exercise

Two TODOs, both in `src/routes/lab/+page.svelte`'s `<script>` block:

1. **Map the `artist` field.** It exists on every sketch object but
   isn't drawn anywhere yet. A second line of text under the title is
   the obvious option, but any visual treatment is fair game.
2. **Stretch: animate the favourite ring.** It's currently static.
   `p.draw()` already runs on a loop — anything driven by
   `p.frameCount` (e.g. `p.sin(p.frameCount * 0.05)`) will animate for
   free.

`/viz` is left untouched as the reference version — compare against it
if you want to check your work in `/lab`.

## p5 import — static, matching the established pattern

`import p5 from 'p5'` at the top of the file, `onMount(() => {...})`
(not `async`) — same shape as the very first p5 demo in Week 1. An
earlier draft of this project used a dynamic `await import('p5')`
inside an async `onMount`, based on an assumption that p5 would crash
SvelteKit's server-side render otherwise. That assumption turned out to
be wrong for this p5 version — checked against Dave's own Week 1
reference code, then confirmed directly: a real SSR request to `/viz`
renders cleanly with the static import, no `window is not defined`
error, no special handling needed. Fixed to match the established
pattern (2/9/26).

## Verified

`svelte-check`: **0 errors, 0 warnings**. `npm run build`: succeeds. A
running `preview` server was hit directly with real HTTP requests
(exercising actual server-side rendering, not just the build step) —
`GET /viz` and `GET /lab` both return 200 with sketch data correctly
rendered, and the server log shows no SSR errors. End-to-end tested
against a running `15-express-sketch-api` alongside it (2/9/26). Node
22.22.2 / Svelte 5.56.1 / SvelteKit 2.63.0 / Vite 8.0.16 / p5 2.3.2.
