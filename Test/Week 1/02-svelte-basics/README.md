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

## Facilitation notes
- **Before opening this project — close the gap from `01-vite-starter`.**
  Students last saw `npm create vite@latest` produce a *vanilla*
  project. Don't jump straight to this pre-built folder — run the
  same command live again first, this time picking the **Svelte**
  template instead of Vanilla:
  ```
  npm create vite@latest my-svelte-app -- --template svelte
  ```
  Let it finish, glance at the file tree together (note `src/App.svelte`
  appearing where `main.js` was), then say something like "this is the
  same starting point as this folder — I've just already built out the
  examples we're about to walk through on top of it." Without this
  moment, the jump from a blank Vite project to a multi-file Svelte
  app with a menu can look like Svelte projects come from somewhere
  else entirely, rather than the exact same scaffolding step.
- Suggested demo order matches the file numbering — each one changes
  exactly one thing from the last, so the diff is the teaching point.
- Example 1 is deliberately anticlimactic — let the class watch the
  button do nothing, then ask "so what would make this update?"
  before revealing Example 2.
- Example 3's coloured rectangle is there so reactivity is visibly
  obvious, not just numbers changing — worth pointing at rather than
  just reading the count out loud.
- Hand off to the lab once Example 4 lands — the lab only recombines
  patterns already demoed, nothing new to teach first.
