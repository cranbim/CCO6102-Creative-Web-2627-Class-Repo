# 08 — svelte-shared-state

Week 3, Track 1. Demo + lab in one project, per the Week 1/2 consolidation
pattern (see Week 1's `02-svelte-basics/README.md` for the precedent).

## Setup

```
npm install
npm run dev
```

## What's in here

- **`lib/before/`** — a props-drilled 3-level chain (`PageBefore` →
  `MiddleBefore` → `DeepBefore`). `MiddleBefore` doesn't use the data, it just
  relays it. This is the pain point re-surfaced from the Week 3 pre-study
  reflective prompt.
- **`lib/after/`** — the identical UI and component depth, refactored to use
  `lib/shared/counterState.svelte.js`. `MiddleAfter` needs no props at all.
- **`lib/shared/counterState.svelte.js`** — the actual technique taught this
  week: `export const counter = $state({ count: 0 })`, mutated via a
  `counter.count += 1` style function, **not** `writable()` from
  `svelte/store`. See the comments in that file for why the object wrapper is
  necessary (exporting a reassigned primitive throws `state_invalid_export`).
- **`lib/shared/counterState.encapsulated-variant.svelte.js.txt`** —
  reference only, not wired into the app. Shows the same pattern via
  getter/setter functions instead of object mutation. Worth a **brief**
  mention in class — this is the shape of a data *model*, and it's the same
  shape the Express + Mongoose API will use once the static-array data
  source gets swapped for MongoDB, several weeks from now. Don't teach it in
  depth here; a single sentence and a glance at the file is enough.
- **`lib/lab/`** — the in-class/post-study lab exercise. Still props-based on
  purpose. Students refactor `LabPage`/`LabMiddle`/`LabDeep` themselves,
  following the TODO comments in each file, then attempt the stretch
  challenge (add a second shared value) commented at the bottom of
  `LabDeep.svelte`.

## Facilitation notes

- **Live-scaffold this from scratch in front of students first** (per the
  module's live-scaffolding principle) — `npm create vite@latest`, choose
  Svelte, then build up `lib/before/` together before revealing `lib/after/`.
  Don't open a finished project cold.
- Suggested pacing: build/show `before/` first and let the "ugh, Middle
  doesn't even use this" feeling land verbally, THEN introduce
  `counterState.svelte.js` and build `after/` live, deleting the props chain
  as you go rather than pasting in a finished version.
- The two panels in `App.svelte` are side by side deliberately (same idea as
  Week 2's sequencer A/B). Click Increment in both and ask students what's
  identical (the result) and what's different (the code path) before moving
  to the lab.
- **Terminology note for you to say out loud in class:** call this "shared
  state" or "the store pattern" interchangeably — students will meet the
  word "store" again in SvelteKit's `$page` store, and in older tutorials.
  If anyone finds a tutorial using `writable()`, that's not wrong, just
  older — the Advanced Reactivity → Stores page on the official tutorial
  covers it (linked in the outline's resource list for this week, row 13).
- Verified: builds clean on Node 22.22 / Svelte 5.56 / Vite 8.2.
