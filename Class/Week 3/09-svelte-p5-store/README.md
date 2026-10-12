# 09 — svelte-p5-store

Week 3, Track 2. Demo + lab in one project. Direct payoff of the "no store"
seed deliberately left in Week 1's `03-svelte-p5-demo` / `04-svelte-p5-lab`.

## Setup

```
npm install
npm run dev
```

## What's in here

- **`lib/before/DuplicatedSketch.svelte`** — recreates the Week 1 shape:
  a DOM slider updates a Svelte value, which is then manually copied into a
  second, separate variable that the p5 sketch actually reads. Comment out
  the sync line (see the comment in the file) to make the desync failure
  visible and undeniable — don't just describe it, let a student break it.
- **`lib/after/SharedSketch.svelte`** — identical UI and sketch, refactored
  so the slider and the p5 `draw()` loop both read/write
  `lib/shared/sketchState.svelte.js` directly. No second copy exists.
- **`lib/shared/sketchState.svelte.js`** — same pattern as Track 1's
  `counterState.svelte.js`: `$state` object, mutated via a named setter.
- **`lib/lab/LabSketch.svelte`** — starts from a working "size only" shared
  sketch. TODO comments walk students through adding a second shared value
  (`hue`) themselves, plus a stretch challenge for a third value or a second
  slider-controlled aspect of the sketch.

## Facilitation notes

- p5 runs in **instance mode**, wrapped in `onMount`/`onDestroy` — this
  matches the pattern already used in Week 1's p5 demos, so the p5-specific
  wiring itself isn't new to students this week; only the shared-state part is.
- The `draw()` loop reads `sketchState.size` directly, every frame, with no
  `$derived` or `$effect` involved — worth calling out explicitly, since
  students may expect they need an effect to "push" the value into p5. They
  don't: p5's own animation loop just reads the current value each time it
  runs, the same way it would read any other JS variable.
- Suggested pacing: run `DuplicatedSketch` first, actually comment out the
  sync line live and reload so students see the freeze, THEN build
  `SharedSketch` — mirrors the "feel the pain, then fix it" arc from Track 1
  this week, applied to Track 2's own material.
- Verified: builds clean on Node 22.22 / Svelte 5.56 / Vite 8.2 / p5 2.3.2.
