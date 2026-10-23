# Supplement — async/await

**Not part of Week 5's main teaching flow.** Per Dave's steer, async/await
was deliberately pulled out of the main Track 1 sequence this week — see
the outline tab's "SUPPLEMENT" block. This exists so the resources and a
working demo are ready whenever Dave decides where it fits: this week's
pre-study, a standalone session, folded into Week 6, or left as a
self-serve link in a handout.

## Running it

No project setup, no `npm install` — this is deliberately just a few
lines, run directly:

```bash
node async-await-demo.js
```

Takes about a second to finish (there's a genuine `setTimeout` in it, on
purpose — see below).

## What it shows, in order

1. **A normal synchronous function** — nothing new, just a baseline.
2. **A function returning a Promise** — logging the Promise object
   itself immediately makes the point visible: the value genuinely isn't
   ready yet when that line runs.
3. **The same idea with `async`/`await`** — written to *look* synchronous,
   while still not blocking the rest of the program (watch the console
   output order: the "this line runs before..." message genuinely does
   print before "Got: toast (but slower)").
4. **The payoff** — explicitly ties back to `await fetch(...)`, which
   every load function since Week 4 has used unexplained.

## If teaching this live

15-20 minutes is enough. Suggested flow:

1. Run it once, unexplained, and just look at the output together —
   ask "why did that log a Promise, not the string?"
2. Walk through parts 1-3 of the source file on screen.
3. Land on part 4 — the connection back to `await fetch(...)` in every
   `load` function students have already written. This is the actual
   payoff; don't rush past it.

## Verified

Runs cleanly on Node 22.22.2, 2/9/26 — output confirmed to match the
expected teaching narrative (in particular, that the "doesn't block the
rest of the program" line really does print before the awaited value
resolves, not just in theory).
