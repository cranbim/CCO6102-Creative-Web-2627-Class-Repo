# 10 — svelte-if-each

Week 2 supplement. Two versions of the same friends list, run independently
side by side in one `App.svelte` — same shape as other weeks' before/after
demos.

## Setup

```
npm install
npm run dev
```

## What's in here

- **`App.svelte`** — top-level shell. Imports and renders both versions
  below. Nothing shared between them — separate components, separate data,
  separate state.

- **Version 1 — `StaticDemo.svelte` + `FriendCard.svelte`**
  The original, simplest form. Data is a plain `const` array declared
  directly in the component, no import, no fetch. `{#each friends as
  friend}` loops over it; `FriendCard.svelte` uses `{#if friend.online}
  ... {:else} ... {/if}` to pick which markup to show. No interactivity.

- **Version 2 — `ToggleDemo.svelte` + `ToggleFriendCard.svelte`**
  Same starting data, same `{#each}`/`{#if}` — but now it's `$state`, each
  card has a button, and clicking it actually changes something.
  `ToggleDemo.svelte` owns the state and defines `toggleFriend(friend)`,
  which mutates `friend.online` directly (the object-mutation pattern used
  elsewhere in the module — `{#each}` already hands each card a live
  reference into the array, so this is enough to trigger reactivity).
  That function is passed down to `ToggleFriendCard.svelte` as a prop
  (`onToggle`) — the card's button calls it, but the card itself never
  touches `friend.online`. Same "pass a callback down as a prop" pattern
  used earlier in the module.

- **Lab — `LabList.svelte` + `LabFriendCard.svelte`**
  Partly scaffolded exercise, same friends-and-toggle shape but a fresh
  property (`favourite` instead of `online`) so it can't be solved by
  copy-paste alone. The `$state` array and the toggle function are given
  in `LabList.svelte` — TODO 1 is to write the `{#each}` block yourself,
  passing `friend` and `onToggle` down to `LabFriendCard`. TODOs 2 and 3,
  in `LabFriendCard.svelte`, are to write the `{#if}`/`{:else}` block and
  the button that calls `onToggle`. Between the three TODOs, students
  practice all four target skills: `{#each}`, `{#if}`, passing data via
  props, and passing a function via props. A stretch challenge (a second
  passed-in function, `onRemove`, that removes a friend from the list) is
  commented at the bottom of `LabFriendCard.svelte`.
  **Ships with the TODOs unfilled** — verified to build and `svelte-check`
  clean in that starter state (an empty `{#each}` slot renders as an empty
  list, which is expected), and separately verified end-to-end with a
  completed version to confirm the exercise is actually solvable as
  written, not just plausible-looking.

## Facilitation notes

- Good side-by-side moment: `FriendCard.svelte` vs `ToggleFriendCard.svelte`
  are nearly identical — the diff is one button and one prop. Worth
  actually opening both files next to each other rather than describing
  the difference verbally.
- If a student asks why `toggleFriend` takes the whole `friend` object
  instead of a name or index to look up — that's the natural question,
  and worth pausing on: because `{#each}` already gives each card a live
  reference into the array, there's nothing to look up. Contrast with
  needing an id/name lookup if the data came from somewhere the reference
  wasn't already in hand (e.g. after a fetch) — a preview of a distinction
  they'll meet again later.
- For the lab: point students at `ToggleDemo.svelte` and
  `ToggleFriendCard.svelte` as the reference to work from rather than
  leaving them to guess the shape — the exercise is applying a pattern
  they've just seen to a new property, not inventing one from scratch.
  Students who finish TODO 1 but leave TODOs 2/3 undone will see plain
  four-item list with no star and no button — a useful visible checkpoint
  partway through, worth mentioning up front so it doesn't read as broken.
- Verified end to end: `npm run build` and `npx svelte-check` both zero
  errors, zero warnings — for the demos, and separately for the lab in
  its shipped (TODOs-unfilled) state. Also verified by actually clicking
  buttons in a live render (Playwright): confirmed the toggle demo changes
  only the clicked friend while Version 1 stays static, and separately
  confirmed a completed version of the lab solves correctly end-to-end —
  not just checked by reading the source.
