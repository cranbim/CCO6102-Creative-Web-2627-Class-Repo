# 02 — Svelte Basics (Track 1, in-class + lab + challenge)

**Used for:** the "Svelte basics — without, then with, state" session.
Svelte 5.56, runes mode throughout — no `let`-is-implicitly-reactive
Svelte 4 syntax anywhere in this project.

## Running it
```
npm install
npm run dev
```
Opens at http://localhost:5173 with a clickable menu across the six
files in `src/examples/` — no need to switch files on screen mid-demo.

## What's in `src/examples/`
| File | Purpose |
|---|---|
| `01-Static.svelte` | Plain `let`, no reactivity — the "before" |
| `02-Reactive.svelte` | Same thing with `$state` — the minimum reactive change |
| `03-MultipleState.svelte` | Two `$state` values interacting, inline computed expression |
| `04-Binding.svelte` | `bind:value` two-way binding on a text input |
| `05-Lab.svelte` | Lab starter — see `lab-instructions.md` |
| `06-Challenge.svelte` | Challenge starter — see `lab-instructions.md` |


