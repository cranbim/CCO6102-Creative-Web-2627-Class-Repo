# 11 — svelte-state-vs-derived

Week 2 supplement, added retrospectively (13/8) — same category as
`10-svelte-if-each`, but a separate addition: `$derived` was never actually
written into any week's teaching points despite several later materials
(the S2a exemplar, `10-svelte-if-each`) assuming it was "Week 3 material."
It wasn't taught anywhere. This closes that gap.

Placed **before** `10-svelte-if-each` in teaching order (see the Week 2 tab
and handout) — `$derived` is a more foundational extension of `$state`
itself, so it makes sense as a prerequisite rather than sitting after
template-syntax additions like `{#each}`. The file number (11) is higher
than 10 purely because of build order, not teaching order — Dave's aware
and will reconcile numbering when the class repo is actually assembled.

## Setup

```
npm install
npm run dev
```

## The actual teaching point — and a genuine correction made while building this

The demo compares a plain function against `$derived` for computing a
value from `$state`. The natural assumption (especially for anyone with
React experience) is "plain functions re-run on every render, `$derived`
doesn't — that's the win." **That assumption was tested against Svelte 5
directly and does not hold.** Svelte's fine-grained reactivity tracks each
template expression independently; a plain function called in the
template only re-runs when the `$state` values *it actually reads* change,
same as `$derived`. An early draft of this demo tried to illustrate the
React-style story with an unrelated second `$state` value and it produced
no visible difference at all when tested — because there isn't one, in
that scenario.

The **real, verified difference**: when the same computed value is used
more than once, a plain function reruns its full calculation for every
usage; `$derived` computes once and every usage reads the same cached
result. The demo shows this directly — each value is displayed twice (main
display + summary line), and a single click on Increment logs the plain
function twice, `$derived` once. Confirmed by running it, not assumed.

**Worth saying explicitly in class**, since it's a genuinely useful
correction to the instinct many students will already have: `$derived`
isn't "the reactive version of a function," it's closer to "a named,
cached value that happens to update itself." The win shows up with reuse
and with expensive calculations, not with render-frequency the way it
would in React.

## Facilitation notes

- If demoing live, open the browser console and project it — the log
  colours (red for plain function, green for `$derived`) make the count
  visually obvious without needing to explain what's happening first.
- Natural connection to draw for students who've done the `10-svelte-if-each`
  supplement (or the S2a exemplar): both currently use plain functions for
  computed values (a filtered list, a colour lookup) specifically *because*
  `$derived` wasn't taught yet. Once this supplement lands, those are
  legitimate candidates for a "how would you rewrite this with `$derived`
  now?" follow-up exercise, if useful.
- Resources: official Svelte docs — `$derived` (https://svelte.dev/docs/svelte/$derived)
  and the interactive tutorial page (https://svelte.dev/tutorial/svelte/derived-state).
- Verified: builds clean on Node 22.22 / Svelte 5.56 / Vite 8.2. Console
  output tested end-to-end (Playwright), not just inferred from source.
