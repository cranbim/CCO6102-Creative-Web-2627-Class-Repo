# 12 — svelte-frontend-review

A consolidation lab for the purely-frontend Svelte skills so far: `$state`,
`$derived`, `$props`, `bind:value`, `{#each}`, `{#if}`, passing a function
down as a prop, and `async`/`await`. Three independent exercises, one
theme (a reading list), roughly easiest to hardest — same "run side by
side" shape as every demo/lab so far.


## Setup

```
npm install
npm run dev
```

## What's in here

- **Exercise 1 — `Exercise1_Shelf.svelte` + `BookRow.svelte` (warm-up).**
  Exactly one thing to write: an `{#each}` loop. `BookRow.svelte` is
  completely finished, including its own `{#if}`/`{:else}` badge — so a
  student who writes the `{#each}` correctly sees the *whole* exercise
  working immediately. Deliberately not asking for anything else at this
  tier — the goal is a quick, real win, not coverage.

- **Exercise 2 — `Exercise2_Progress.svelte` + `ProgressCard.svelte`
  (core practice).** The `$state` array and the page-logging function
  are given (same object-mutation pattern as the shared-state material —
  `{#each}` already hands each card a live reference, so mutating a
  property is enough). Four TODOs across the two files: the `{#each}` +
  prop-passing in the parent, then `$derived` (a computed percentage),
  `bind:value` (a number input), and `{#if}` (a "finished" message) in
  the child. This is the tier most students should expect to spend most
  of their time on.

- **Exercise 3 — `Exercise3_Recommend.svelte` + `recommendations.js`
  (stretch).** Deliberately less scaffolded — three tasks described in a
  comment block rather than numbered inline TODOs at each exact line.
  Ships with the *same bug* as the async/await demo's `Before.svelte`
  (no `await`), for students to recognise and fix themselves, then asks
  them to add a loading state (same idea as that demo's `After.svelte`)
  and handle an empty-input case with no direct precedent to copy from —
  the first genuinely open-ended task in the series. Closes with an
  invitation to invent an extra feature, for anyone who finishes early.


