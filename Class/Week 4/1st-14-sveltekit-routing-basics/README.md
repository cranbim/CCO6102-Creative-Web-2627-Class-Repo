# 14 — SvelteKit routing & shared components

Week 4, Track 1. A small self-contained multi-page site with **no
external data, no API, no `load` function at all** — just SvelteKit's
file-based routing and `#lib` sharing mechanism, taught on its own
before any of that gets tangled up with fetching data from somewhere
else.

**Numbering note:** this is demo 14, but it's taught *first* in the
session — before `12-sveltekit-neo-proxy` and `13-svelte-p5-neo-viz`.
The number reflects build order (it was added after 12 and 13 already
existed), not teaching order. See the Week 4 outline (row 13) and
slide outline for the actual sequencing.

## Creating this project from scratch

This is how the demo was created, and how the session starts: **live,
before looking at the finished version.**

**The command** — run it in the folder where you keep your projects:

```bash
npx sv create my-routing-demo
```

`sv` is the Svelte command-line tool. This is the SvelteKit equivalent of
the `npm create vite@latest` you used in Weeks 1–3.

**The choices** — it asks a few questions. Ours are:

| Question | Our answer |
|---|---|
| Which template? | **SvelteKit minimal** |
| Add type checking? | **JavaScript with JSDoc** — *not* TypeScript (this module doesn't use it) |
| Add-ons? | **None** — just press enter without selecting any |
| Install dependencies with? | **npm** |

The exact wording of the prompts can change a little between versions of
`sv`. To skip the questions and get precisely this setup in one go:

```bash
npx sv create --template minimal --types jsdoc --no-add-ons --install npm my-routing-demo
```

Then run it:

```bash
cd my-routing-demo
npm run dev -- --open
```

You'll see a "Welcome to SvelteKit" page. Edit `src/routes/+page.svelte`,
save, and watch the browser update. Stop the server with Ctrl-C.

**What you end up with — a quick tour**

```
my-routing-demo/
├── src/
│   ├── routes/
│   │   ├── +page.svelte      the home page — this IS the "/" route
│   │   └── +layout.svelte    wraps every page (later: the shared nav)
│   ├── lib/                  shared code — imported with the #lib alias
│   │   ├── assets/favicon.svg
│   │   └── index.js
│   ├── app.html              the outer HTML shell every page sits inside
│   └── app.d.ts              type declarations (you can ignore this)
├── static/                   files served exactly as they are (robots.txt…)
├── package.json              your scripts: dev, build, preview, check
├── vite.config.js            Vite + SvelteKit settings (there is no svelte.config.js)
├── jsconfig.json             lets your editor read the JSDoc type comments
├── .gitignore  .npmrc  README.md
└── node_modules/             installed packages — never edit, never commit
```

Two things to notice straight away:

- **`src/routes/` is where the routing lesson lives.** A fresh project
  already has a `+page.svelte` (the home page) and a `+layout.svelte`.
  Everything this demo does is adding more of those.
- **`#lib`, not `$lib`.** SvelteKit 3 spells the shared-code alias `#lib`
  (it was `$lib` in SvelteKit 2). `package.json` declares it in an
  `"imports"` section, and imports need the file extension:
  `import { sketches } from '#lib/sketches.js'`. Older tutorials, videos
  and AI-generated code will still say `$lib` — same idea, old spelling.
  [Migrating to SvelteKit v3](https://svelte.dev/docs/kit/migrating-to-sveltekit-3)
  has the details.

The finished demo in this repo is what you get after following the
session: the same project with Home, About, Gallery and a dynamic route
added.

## Running the finished demo

```bash
npm install
npm run dev -- --open
```

Nothing else required — no `.env`, no API key, no network access
needed at all. Everything on every page comes from
`src/lib/sketches.js`, a plain hardcoded array.

## What it demonstrates

- **File-based routing**: `src/routes/+page.svelte` → `/`,
  `src/routes/about/+page.svelte` → `/about`. A folder with a
  `+page.svelte` in it *is* a route — no registration step.
- **A shared layout**: `src/routes/+layout.svelte` wraps every page
  with the same nav, written once.
- **A dynamic route**: `src/routes/gallery/[slug]/+page.svelte` — the
  square brackets mean "this segment is a parameter". Visiting
  `/gallery/pulse-grid` matches with `params.slug === 'pulse-grid'`.
  Deliberately uses the `params` prop directly (available on every
  `+page.svelte` since SvelteKit 2.24) rather than a `load` function —
  the lookup against the local array is simple enough not to need one.
- **A shared component**: `src/lib/SketchCard.svelte`, imported and
  reused on both the Home page (as a single "featured" card) and the
  Gallery page (once per entry, in a loop).
- **A shared data module**: `src/lib/sketches.js` — `#lib` isn't just
  for components; plain `.js` modules work the same way.

## Lab: build a Favourites page yourself

Deliberately NOT scaffolded — creating the route from scratch is the
exercise. You have everything you need from the demo above.

**Task**: add a new page at `/favourites` that:

1. Is its own route — create `src/routes/favourites/+page.svelte`
   (same pattern as `/about`).
2. Picks 2 of the 4 entries from `src/lib/sketches.js` (just index into
   the array, or use `.filter()`) and displays them using the shared
   `SketchCard.svelte` component — same import, same usage as the
   Gallery page.
3. Gets a nav link — there's a `<!-- LAB -->` comment marking where in
   `src/routes/+layout.svelte` to add it.

**Stretch challenge**: add a second dynamic route of your own — e.g.
group sketches by a new `category` field you add to `sketches.js`, at
a route like `/gallery/category/[name]`.

## Pages

- `/` — Home, features one card
- `/about` — a plain static page, no dynamic content
- `/gallery` — lists all four sketches using the shared card component
- `/gallery/[slug]` — detail view for one sketch, e.g. `/gallery/pulse-grid`
- `/favourites` — **lab exercise, not pre-built** — see above

## Verified

Migrated to SvelteKit 3 and re-verified 6/10/26 on Node 22.22, Svelte 5.57,
SvelteKit 3.0.1, Vite 8.3.3: builds clean, `svelte-check` passes with zero
errors, and all five route shapes (`/`, `/about`, `/gallery`,
`/gallery/pulse-grid`, and the not-found case `/gallery/nonexistent`)
render correctly against a local preview server. `/favourites` is
intentionally absent — it's the lab.
