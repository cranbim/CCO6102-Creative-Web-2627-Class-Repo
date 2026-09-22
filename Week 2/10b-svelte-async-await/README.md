# 11 — svelte-async-await

Introduces `async`/`await` from scratch — previously unseen syntax, or
seen and not understood. Three independent sections, same "run multiple
versions side by side" shape as `10-svelte-if-each`.

No real network calls anywhere in this demo — `delay.js` fakes the wait
with `setTimeout`, so it works offline and the timing is predictable
(always ~1–1.2s) for a live teaching demo.

## Setup

```
npm install
npm run dev
```

## What's in here

- **`delay.js`** — `delay(ms)` returns a Promise that resolves after `ms`
  milliseconds. A stand-in for "anything slow" — a network request, a
  slow calculation. Used by both `fortunes.js` and `eightball.js`.

- **`fortunes.js`** — `getFortune()`, a fake API. Deliberately written
  with `.then()`, not `async`/`await` — this file's job is to hand back
  a Promise, not to teach the new syntax. `async`/`await` genuinely
  appears for the first time in `After.svelte`, not before.

- **`Before.svelte` — THE PROBLEM.** Calls `getFortune()` and assigns the
  result directly, no `await`. Click the button and `fortune` becomes the
  Promise object itself — Svelte renders it as `[object Promise]`,
  immediately, no waiting required to see the bug. An on-page note
  explains what happened and names what's coming next.

- **`After.svelte` — THE FIX.** Same `getFortune()` call, now inside an
  `async function`, with `await` in front of it. Also adds a `loading`
  boolean — genuinely motivated here, not bolted on: once you can `await`
  a value, "what does the UI look like while we wait" becomes a real
  question worth answering.

- **`eightball.js` / `LabEightBall.svelte` — THE LAB.** A fresh scenario
  (a magic 8-ball, not another fortune cookie) so the exercise can't be
  solved by copy-paste. **Ships with the same bug as `Before.svelte`,
  unfixed** — students see `[object Promise]` on first run, then apply
  the two-word fix themselves (`async` + `await`), guided by TODO
  comments. A stretch challenge (add a `thinking` state, same idea as
  `After.svelte`'s `loading`) is commented at the bottom.

## Facilitation notes

- Suggested pacing: run `Before.svelte` live and let the `[object
  Promise]` output land before explaining anything — the on-page note is
  there so the demo still teaches itself if someone re-watches a
  recording without you narrating live. Then `After.svelte`, then the lab.
- The lab's starter state **is the bug, on purpose** — don't apologise
  for the app "looking broken" when you first show it. That's the
  starting point, same as `Before.svelte`.
- If a student asks why `getFortune()`/`askThe8Ball()` are written with
  `.then()` instead of `async`/`await` internally — good question, and
  worth answering directly: it's so the new syntax genuinely appears for
  the first time in `After.svelte`, not spoiled a file earlier.
- Type-checking note, not a teaching point: `fortune` and `answer` are
  typed as `string | Promise<string>` via a JSDoc comment in `Before.svelte`
  and `LabEightBall.svelte`. That's purely to satisfy strict `checkJs` —
  it has zero effect on the actual bug or its fix.
- Verified end to end, for every part: `npm run build` and `npx
  svelte-check` both zero errors, zero warnings — including the lab in
  its shipped (unfixed) state. Also verified live in a browser
  (Playwright): `Before`'s bug appears immediately on click, `After`
  shows the loading state then resolves to a real fortune (~1.2s), and
  the lab's starter reproduces the same bug. Separately built and
  verified a completed version of the lab to confirm the exercise is
  actually solvable exactly as instructed, not just plausible-looking.

## A numbering note

This continues on from `10-svelte-if-each`. I don't have visibility into
the full class repo from this session, so if `11` is already taken by
something else, this is easy to renumber — nothing in the file names or
imports depends on the number.
