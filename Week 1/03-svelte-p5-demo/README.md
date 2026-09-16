# 03 — Svelte + p5 Canvas Demo (Track 2, in-class)

**Used for:** the "Demo: Svelte project with p5 canvas, no store,
simple reactivity" session. p5 v2.3.2 (current major version — see
the Week 1 tab notes on the 1.x → 2.0 transition). No store anywhere
in this project, by design.

## Running it
```
npm install
npm run dev
```
Three sliders (size, speed, hue) drive a bouncing circle on a p5
canvas.

## How it works (the whole demo, in one paragraph)
`src/lib/P5Canvas.svelte` is a small reusable wrapper that mounts a p5
"instance mode" sketch inside `onMount` and removes it in `onDestroy`
— that's the only p5-specific plumbing in the project. `src/App.svelte`
declares three `$state` variables bound to sliders, and the sketch
function (also in `App.svelte`) just *reads* those same variables
inside `p.draw()`. No manual syncing code, no store — `$state` values
are always current wherever they're read in the same component.

## Facilitation notes
- Good board/verbal moment: ask "how is the slider value getting into
  the canvas, when nothing is explicitly pushing it there?" — the
  answer (draw() runs 60x/sec and just reads the current value) is
  worth dwelling on.
- The comment in `App.svelte` deliberately seeds the Week 3 stores
  discussion ("what would get awkward if the sliders lived in a
  different component?") — don't answer it yet if a student asks.
- `P5Canvas.svelte` is written to be readable, not maximally reusable
  — a deliberate choice given "feel the pain before the solution".
  `svelte-p5` (svelte-p5.dev) is a fuller-featured version of this
  same pattern, worth mentioning as an option for their own projects.
- Build produces a bundle-size warning (p5 is a large dependency) —
  that's expected and not a bug; not worth surfacing to students at
  this stage.
