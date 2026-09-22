# 10 — svelte-if-each

Week 2 supplement, added retrospectively (13/8) after catching that neither
`{#if}` nor `{#each}` was actually written into the Week 1/Week 2 teaching
points, despite being needed for the S2a checkpoint. Not part of the
original Week 1–2 numbered series (05–07); numbered 10 to avoid clashing
with Week 3's already-built 08/09.

This is a standalone, optional item — not wired into Week 2's core session
flow. See the Week 2 tab (Track 1, Post-study) for how it's currently
positioned, and treat that placement as provisional until you've decided
whether this becomes in-class content, self-study, or both.

## Setup

```
npm install
npm run dev
```

## What it demonstrates

- **`$state`** holding an array (`tasks`), not just a single number —
  extends what students already know from Week 1 to a new data shape.
- **`{#each}`** rendering one `TaskItem` component per task — ties directly
  into Week 2's component/props work, so this reads as "one more thing you
  can do with the props pattern you already have," not a new topic in
  isolation.
- **`{#each ...}{:else}...{/each}`** — the each block's own built-in empty
  state, shown when the "show only incomplete" filter clears the list.
  Worth calling out as a separate feature from a standalone `{#if}`,
  since it's easy to reach for `{#if list.length === 0}` instead without
  realising `{:else}` on the each block itself does the same job with less
  code.
- **`{#if}/{:else}`** inside `TaskItem.svelte` — switches between a "Done"
  badge and a "Mark done" button based on `task.done`.
- Mutating an object property inside a `$state` array
  (`task.done = !task.done`) is enough to trigger reactivity — no need to
  replace the whole array. Worth flagging explicitly if this comes up,
  since it can look surprising coming from React's "always return a new
  array" convention.

## Facilitation notes

- Deliberately reuses the "pass a callback down as a prop" pattern
  (`onToggle`) already established in Week 2's demos, rather than
  introducing a new way of handling child-to-parent communication.
- Deliberately avoids `$derived` for the filtered list — see `visibleTasks()`.
  A separate optional supplement (`11-svelte-state-vs-derived`, placed
  earlier in teaching order than this one) now covers `$derived` properly;
  this demo predates that and was never updated to use it, since the plain
  function still does the job for something this small.
- If you fold this into a live session rather than self-study, the natural
  order is: show `{#each}` alone first (just the list, no filter, no
  `{:else}`), THEN add the checkbox + `{:else}` empty state as a second
  beat, THEN open `TaskItem.svelte` to show the `{#if}` toggle. Introducing
  all three at once in one file read risks blurring together as "one big
  new thing" rather than three small, separable ones.
- Verified: builds clean on Node 22.22 / Svelte 5.56 / Vite 8.2.
