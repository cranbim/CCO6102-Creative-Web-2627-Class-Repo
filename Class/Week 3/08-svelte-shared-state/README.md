# 08 — svelte-shared-state

Week 3, Track 1. Demo + lab in one project

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


