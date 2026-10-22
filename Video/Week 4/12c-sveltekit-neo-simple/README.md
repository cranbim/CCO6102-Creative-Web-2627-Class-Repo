# 12c — Getting data from NASA, step by step

A simpler version of demo 12 for students coming from vanilla JavaScript. Same story and same NASA asteroid data, with less new syntax and no type comments.

**Teaching order: 14 → 12b → 12c → 13c.** Demos 12 and 13 stay in the repo as the fuller versions, for anyone who wants the tidier shared-helper style.

## Creating this project from scratch

```bash
npx sv create 12c-sveltekit-neo-simple --template minimal --no-types --no-add-ons --install npm
```

`--no-types` means no type checking at all (the earlier demos used `--types jsdoc`). That is why there are no `/** @type ... */` comments anywhere in this project.

## Run it

```bash
npm install
cp .env.example .env      # Windows: copy .env.example .env
npm run dev -- --open
```

Copying `.env.example` to `.env` is a required step. Pages 2 and 3 will not run without it (see the first idea below). `.env.example` already contains NASA's shared `DEMO_KEY`, so it works straight away. For class, get your own free key at https://api.nasa.gov and put it in `.env` instead, because `DEMO_KEY` is limited to 30 requests an hour for everyone.

## The pages

| Page | What it shows |
|---|---|
| `/naive` | Calls NASA from the browser with the key in the code. Open the Network tab and read the key. |
| `/load` | The key lives in `.env`, and a `load` function fetches the data on the server before the page is shown. |
| `/proxied` | The same data, fetched when you click a button, through our own API route `/api/neo`. |
| `/lab` | Your turn: make `/api/neo-lab` accept `?days=`. |

## Three new ideas, three places to look

**1. `.env` and `src/env.js`.** Your secret lives in `.env`, which is never uploaded to GitHub. SvelteKit 3 also wants it *declared* in `src/env.js`, like a guest list: only variables named there can be imported. Server code then reads it with `import { NASA_API_KEY } from '$app/env/private'`. SvelteKit refuses to send anything imported from there to the browser. If you forget to create `.env`, SvelteKit stops with `env_invalid: Value is missing`, which just means "copy `.env.example` to `.env`".

**2. `load` in `+page.server.js`.** `src/routes/load/+page.server.js` runs on the server before the page appears. What it returns becomes `data` in `+page.svelte`. The page itself has no `fetch`, no loading variable and no button.

**3. An API route.** `src/routes/api/neo/+server.js` is the same kind of file as in demo 12b. The page calls it with `fetch` when the user asks, and it calls NASA for us.

All three share one helper, `src/lib/server/neo.js`. It reads the key, calls NASA, and calculates the danger score. It lives in a `server` folder, so neither the key nor the formula can ever reach the browser.

## Reading the code: what we left out

Written for readers who know vanilla JS but not much modern syntax.

- No JSDoc or type comments.
- No spread (`...`), optional chaining (`?.`) or `new URL(...)` helpers. URLs are built by joining strings with `+`.
- Plain `for` loops instead of `Object.values(...).flat()`.
- `load()` and `GET()` take no parameters. The lab's `GET({ url })` is the one exception, with a comment explaining it.
- Kept on purpose: `async`/`await` (each `await` is commented in plain English), arrow functions, and the `let { data } = $props()` style from earlier weeks.

## Lab: let the API route take a number of days

Open `/lab`, then `src/routes/api/neo-lab/+server.js`. The route always returns today. Follow the numbered comments in the file to:

1. read `?days=` from the URL (it arrives as a string);
2. turn it into a number;
3. check it is a whole number from 1 to 7, and send a `400` if not;
4. pass it to `getAsteroids(...)`.

Stretch: if `?days=` is missing, use 1 instead of failing.

| URL | Expected |
|---|---|
| `/api/neo-lab?days=1` | 200, today's asteroids |
| `/api/neo-lab?days=3` | 200, about three days' worth |
| `/api/neo-lab?days=0`, `9`, `abc` | 400 |

A tutor solution is supplied separately, not in this project.

## Further reading

- **`.env` and `src/env.js`:** [Svelte tutorial: Environment variables](https://svelte.dev/tutorial/kit/env-static-private) and [SvelteKit docs: Environment variables](https://svelte.dev/docs/kit/environment-variables). Both match SvelteKit 3. Older articles show `$env/static/private`, which still works but is deprecated.
- **`load`:** [Svelte tutorial: Page data](https://svelte.dev/tutorial/kit/page-data) and [SvelteKit docs: Loading data](https://svelte.dev/docs/kit/load) (long: read "Page data" and "Universal vs server").
- **API routes:** [Svelte tutorial: GET handlers](https://svelte.dev/tutorial/kit/get-handlers), [POST handlers](https://svelte.dev/tutorial/kit/post-handlers) and [SvelteKit docs: +server](https://svelte.dev/docs/kit/routing#server).

## Verification notes (tutor)

Built on SvelteKit 3.0.1 (Svelte 5.57, Vite 8.3, Node 22). Tested against a **mock NASA server** that copies NASA's documented response shape, because the build sandbox cannot reach `api.nasa.gov`:

- All five pages return 200, and `/load` contains the asteroids in its HTML.
- The key from `.env` is the one sent to NASA (changing `.env` changes it).
- With no `.env`, the build stops with `env_invalid`.
- With the tutor solution: `?days=3` returns three days, `0`, `9`, `abc` and `2.5` return 400, and a missing value returns today.

**Please run it once against real NASA before teaching.** Check `/naive`, `/load` and `/proxied` return asteroids. The dates NASA returns are UTC, so very early on a UK morning "today" can be an hour behind.
