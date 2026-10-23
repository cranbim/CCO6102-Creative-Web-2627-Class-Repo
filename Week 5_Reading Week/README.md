# Creative Web — Week 5 Code Demos (Step 2b)

Four items, matching the Week 5 outline tab (v1.3.22):

| Folder | Track | What it is |
|---|---|---|
| `15-express-sketch-api/` | 1 | Standalone Express API — the "big mental leap" |
| `16-sveltekit-sketch-gallery/` | 1 | SvelteKit ↔ Express, `load`, error handling, POST form |
| `supplement-async-await/` | Supplement | Standalone async/await demo — NOT scheduled into this week's flow |
| `17-svelte-p5-sketch-viz/` | 2 | p5 visualisation of the same Sketch Gallery data |

## Run order

These are genuinely separate Node processes. For the full experience:

1. **`15-express-sketch-api`** — start this first, always. Everything
   else depends on it. `npm install && npm run dev` (port 3001).
2. **`16-sveltekit-sketch-gallery`** — Track 1's SvelteKit app.
   `npm install && npm run dev` (port 5173, or whatever Vite picks).
3. **`17-svelte-p5-sketch-viz`** — Track 2's visualisation, reads the
   SAME Express instance as step 2 (not its own copy). `npm install &&
   npm run dev` (a different port from 16, since both use Vite's
   default — run one with `-- --port 5174` if you want them open at
   the same time).

Each folder's own `README.md` has full details, a live teaching flow
matched to the outline tab, and its lab exercise instructions.

`supplement-async-await/` doesn't need any of the above running — it's
a single file, run on its own with `node async-await-demo.js`.

## The thread connecting all three main projects

`15-express-sketch-api`'s `lib/sketchData.js` is the single source of
truth. `16-sveltekit-sketch-gallery` reads AND writes to it (GET, POST,
and — once the lab is done — PATCH/DELETE). `17-svelte-p5-sketch-viz`
only reads from it. Add a sketch via 16's form, then reload 17's `/viz`
page — it's there. That's a genuine "your two tracks are the same app"
moment if the timing in the room allows it.

## Naming note

The data-access module is called `sketchData.js`, not `sketchesStore.js`
— "store" already means something specific in Svelte (`writable()`/
`derived()`, or the `$state` pattern from Week 3), and this file has
nothing to do with Svelte's reactivity. Renamed to avoid the collision.

## Design decision worth re-reading before teaching

`sketchData.js` (in `15-express-sketch-api/lib/`) encapsulates all
four CRUD operations behind `getAll()` / `create()` / `update()` /
`remove()`, even though only two are wired into taught routes this week.
This is deliberate — see that project's own README for the full
rationale — and sets up Week 6's move to MongoDB as a small, contained
change rather than a rewrite.

## What's verified vs. what's a lab TODO

| | GET | POST | PATCH | DELETE |
|---|---|---|---|---|
| Express routes (`15`) | ✅ taught, tested | ✅ taught, tested | 🔧 lab TODO (sketchData.js method already works) | 🔧 stretch TODO |
| SvelteKit forwarding (`16`) | ✅ taught, tested | ✅ taught, tested | 🔧 lab TODO (3-file chain) | 🔧 stretch TODO |

Every ✅ above has been run and its output checked, not just read —
see each project's own README "Verified" section for the exact commands
and results.

## Build environment

Node 22.22.2, Svelte 5.56.1, SvelteKit 2.63.0, Vite 8.0.16, Express
5.2.1, p5 2.3.2. All `node_modules/` folders are excluded from this
bundle — run `npm install` in each project folder before use.
