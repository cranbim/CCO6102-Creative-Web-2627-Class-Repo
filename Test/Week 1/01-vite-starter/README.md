# 01 — Vite Starter (Track 1, in-class)

**Used for:** the dev-environment walkthrough. This is what a plain
Vite project (vanilla JS, no framework) looks like — the target state
for the live `npm create vite@latest` demo, and the reference students
compare their own output against.

## Running it
```
npm install
npm run dev
```
Opens at http://localhost:5173 with hot-reload — edit `src/main.js`
and save to demonstrate instant feedback.

## Facilitation notes
- If demoing the scaffold live, run `npm create vite@latest` fresh in
  front of the class and choose the **Vanilla / JavaScript** template
  — don't just open this folder. This folder is the "here's what you
  should end up with" reference, and the fallback if the live demo
  hits a snag.
- Requires Node.js 20.19+ or 22.12+ — worth confirming on a couple of
  student laptops before the session (see Week 1 tab notes).
- The button/click-counter in `main.js` is intentionally trivial — the
  point of this file is the workflow (save → instant browser update),
  not the code itself.
- **Don't let this be the last time students see the scaffolding
  command today.** When you move on to `02-svelte-basics`, run
  `npm create vite@latest` again live, choosing **Svelte** this time
  — same command, different template. See that project's README for
  why this matters.
