# Track 1 Lab & Challenge — Svelte Basics

## Lab: extend the counter (`src/examples/05-Lab.svelte`)

Starting point: a working counter using `$state`, with an increment button.

Your tasks:
1. Add a **decrement** button next to the existing increment button.
2. Add a **reset** button that sets the count back to `0`.
3. **Stretch:** disable the decrement button when count is already `0`
   (hint: `disabled={count === 0}` on the `<button>`).

Everything you need is already in Examples 1–4 in this project — this
is about recombining patterns you've seen, not learning anything new.

**Estimated time:** 15–20 minutes.

---

## Challenge: step counter (`src/examples/06-Challenge.svelte`)

Starting point: two declared but unused `$state` variables (`count`
and `step`).

Your tasks:
1. Write an `increment()` function that adds `step` to `count`,
   instead of always adding `1`.
2. Add a number input (`<input type="number" bind:value={step}>`) so
   the step size is user-controlled.
3. **Stretch:** what happens if `step` is `0` or negative? Decide
   whether that's acceptable, and if not, guard against it.

**Estimated time:** 20–30 minutes.

---

## If you finish early

Try combining ideas from Examples 3 and 4: build a small component
with two bound inputs (e.g. width and height, like Example 3) where
one of them is a text input rather than a button, and see what other
computed values you can derive in the markup with a plain expression
(no `$derived` needed yet — that's coming later in the module).
