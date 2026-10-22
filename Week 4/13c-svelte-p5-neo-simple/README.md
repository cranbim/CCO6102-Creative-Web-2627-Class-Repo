# 13c — p5 + NASA asteroids

A simpler version of demo 13, in the same plain style as `12c-sveltekit-neo-simple`: no type comments, no spread operator, no optional chaining.

**Teaching order: 14 → 12b → 12c → 13c.**

## Creating this project from scratch

```bash
npx sv create 13c-svelte-p5-neo-simple --template minimal --no-types --no-add-ons --install npm
cd 13c-svelte-p5-neo-simple
npm install p5
```

## Run it

```bash
npm install
cp .env.example .env      # Windows: copy .env.example .env
npm run dev -- --open
```

`.env` is required, as in 12c. See that project's README for why, and for how to get a personal NASA key.

## The pages

- **`/before`** — the sketch drawing random placeholder data.
- **`/after`** — real asteroids, delivered by a `load` function in `src/routes/after/+page.server.js`. There is no loading state because the data is ready before the page appears. This is the case `load` is for: the sketch always needs its data straight away.
  - size = diameter
  - colour (green to red) = the danger score calculated on the server
  - orbit radius = miss distance
  - orbit speed = velocity
- **`/lab`** — the same data, fetched from our API route `/api/neo` when the page appears, so you practise the other pattern.

`src/lib/server/neo.js` and `src/routes/api/neo/+server.js` are identical to 12c's.

## How the sketch is written

`src/lib/AsteroidSketch.svelte` uses p5 in instance mode, as in the Week 1 and 3 demos. Changes from demo 13:

- `Math.max(0.05, ...list.map(...))` is replaced by a small `largest(list, field, minimum)` function with a `for` loop.
- `sketchInstance?.remove()` is replaced by an `if`.
- `Array.from({ length: 12 }, ...)` is replaced by a `for` loop.
- The `list.forEach(...)` loop in `draw()` is a plain `for` loop, which p5 users already know.
- The lab page fetches inside `onMount`, so it runs in the browser only. (Demo 13 called `loadAsteroids()` straight in the script, which also runs on the server.)

## Lab: draw the hazardous asteroids differently

Open `/lab`, then `src/lib/LabSketch.svelte` and follow the LAB comments. Every asteroid has a `hazardous` flag that nothing draws yet. Hint: `p.frameCount` counts frames; feed it to `p.sin()` for a pulse. Stretch: only draw asteroids above a danger-score limit, controlled by a range slider.

A tutor example (a pulsing ring) is supplied separately.

## Verification notes (tutor)

Built on SvelteKit 3.0.1 with p5 2.3.4. Tested against a **mock NASA server** (the sandbox cannot reach NASA), in headless Chromium:

- `/before`, `/after` and `/lab` each draw a canvas with no console errors.
- The tutor ring example draws a pulsing red ring on the hazardous asteroid.

**Please run it once against real NASA before teaching.**
