# Creative Web — Week 1 Code (Step 2b)

Four small, runnable projects supporting the Week 1 detailed tab in
`Creative_Web_outline.xlsx`. Each folder is self-contained — install
and run independently, no shared setup.

| Folder | Track | Session | Row in Week 1 tab |
|---|---|---|---|
| `01-vite-starter/` | 1 | In-class — dev environment | 13 |
| `02-svelte-basics/` | 1 | In-class — Svelte basics + lab + challenge | 14 |
| `03-svelte-p5-demo/` | 2 | In-class — Svelte + p5 demo | 23 |
| `04-svelte-p5-lab/` | 2 | In-class — DOM → p5 lab | 24 |
| `05-p5-from-scratch-guide/` | 2 | Post-study — build p5 into Svelte yourself | 26 |

## Running any project
```
cd <folder-name>
npm install
npm run dev
```
All four have been installed and built successfully in this
environment (Svelte 5.56, Vite 8, p5 2.3.2, Node 22) — `node_modules`
is stripped from this delivered copy to keep the download small, but
`package.json` in each folder pins working versions.

## Design choices worth knowing about (why the code looks like this)

**Runes only, no legacy Svelte 4 syntax anywhere.** Every `$state`
declaration is explicit — matches the KB's Svelte 4 vs 5 note.

**No stores anywhere in Week 1.** Track 1 doesn't need them yet, and
the Track 2 p5 demo deliberately avoids one even though a store would
simplify a *later*, more complex version of the same demo — that's
intentional "feel the pain before the solution" sequencing. The demo's
code comments plant a seed question about this for Week 3, but don't
answer it.

**p5 is installed at its current major version (2.x), not pinned to
1.x.** See the Week 1 tab notes — 1.x is being retired this same
month, and Week 1's sketches don't touch any of the 2.0 breaking
changes (no `preload()`, no custom bezier/curve shapes, no `keyCode`
string comparisons).

**"FIRST ENCOUNTER" comments mark modern JS syntax on its first appearance
in the pedagogical order (vite-starter → svelte-basics → p5-demo → p5-lab
→ from-scratch guide).** Arrow functions, destructuring, and optional
chaining (`?.`) are each explained once, briefly, where a student would
first meet them — not re-explained every time after. If you reorganise
delivery order, check whether a "first encounter" comment needs to move
with it.

**No hidden scaffolding steps.** `02-svelte-basics` is handed over
pre-built, same as the p5 demo — but unlike the p5 case, going from
"blank Vite project" to "this folder" is a five-second live command,
not something worth writing a separate guide for. So instead of a
from-scratch guide, the fix is procedural: re-run
`npm create vite@latest` live, picking Svelte, right before switching
to this folder. See `01-vite-starter/README.md` and
`02-svelte-basics/README.md` for the full facilitation note — easy to
lose if you reorganise delivery order, so it's called out in both
places.

**The p5 integration is hand-rolled (instance mode + onMount/onDestroy),
not the `svelte-p5` wrapper library.** A deliberate call, not an
oversight — see `03-svelte-p5-demo/README.md` for the reasoning.
Worth mentioning `svelte-p5` to students as an option for their own
project work, since it removes some of this boilerplate once the
underlying pattern is understood.

**Numbered example files within `02-svelte-basics/`.** Each file
changes exactly one thing from the previous one, so the numbering
itself carries the "here's the diff" teaching point — worth preserving
if you reorganise anything.

## Suggested delivery order in the two sessions

1. `01-vite-starter` — dev environment walkthrough (scaffold: Vanilla template)
2. `02-svelte-basics` (examples 1–4) — **first re-run the scaffold command live, choosing the Svelte template this time** (see that project's README), then switch to this pre-built folder
3. `02-svelte-basics` (lab + challenge) — hands-on
4. `03-svelte-p5-demo` — Track 2 demo
5. `04-svelte-p5-lab` — Track 2 hands-on
6. `05-p5-from-scratch-guide` — Track 2 post-study, self-paced

## Why `05-p5-from-scratch-guide/` exists

The demo and lab are handed to students already scaffolded — deliberate,
so class time goes on *using* p5 reactively rather than on setup. Left
alone, that risks p5 feeling like it "just appears" in a Svelte project.
This is a single Markdown walkthrough (not a pre-built project) that has
students build the same pattern themselves from an empty Vite+Svelte
project, with one control instead of three, in about 20 minutes.
Every code block in it has been independently built and verified in
this environment — it's not just prose, it compiles.

## Not included here (later steps)

- A shared class repo / GitHub home for these — per the Week 1 Notes,
  that doesn't exist yet, so these are handed over as standalone
  folders for now.
- The student-facing handout and slide outline (Step 2c/2d) — these
  files are referenced from the handout once it's built, not a
  substitute for it.
