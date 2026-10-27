# 16_FullCRUD — SvelteKit Sketch Gallery (all four verbs)

**Week 5, Track 1, "full CRUD" variant.** This is demo 16 with the lab finished: the gallery can **add** (POST), **read** (`load`), **star/unstar** (PATCH) and **delete** (DELETE) sketches, all stored in `15_FullCRUD_express-sketch-api`'s memory. Server-to-server only: the browser never talks to Express.

**Differences from demo 16**

- `src/lib/server/sketchApi.js`: `updateSketch()` and `deleteSketch()` added.
- `src/routes/api/sketches/[id]/+server.js`: `PATCH` and `DELETE` handlers written.
- `src/routes/gallery/+page.svelte`: `toggleFavourite()` finished, `deleteSketch()` and a ✕ button added, a note about non-persistence at the bottom.
- `src/routes/api/sketches/+server.js`: reading the request body now has its own `try/catch`, so a bad body is a 400 rather than an unhandled error.
- No `lab-solution-reference/` folder: there is no lab here.

## Creating this project from scratch

```bash
npx sv create 16_FullCRUD_sveltekit-sketch-gallery --template minimal --no-types --no-add-ons --install npm
```

`--template minimal` skips the demo counter app; `--no-types` is plain JavaScript; `--no-add-ons` skips ESLint/Prettier/Playwright prompts; `--install npm` installs straight away. Then add the `#lib` aliases (`imports` in `package.json`), `src/env.js`, `.env.example`, and set `"checkJs": false` in `jsconfig.json`, exactly as in demo 16.

## Before the session

**Terminal 1: start the Express API first**

```bash
cd ../15_FullCRUD_express-sketch-api
npm install
npm run dev
```

**Terminal 2: this project**

```bash
cd 16_FullCRUD_sveltekit-sketch-gallery
npm install
cp .env.example .env     # required: SvelteKit refuses to start without it
npm run dev -- --open
```

`.env` holds one variable, `SKETCH_API_URL=http://localhost:3001`. If it is missing, SvelteKit stops at startup with an `env_invalid` error naming the variable.

## The four verbs, end to end

| Verb | What you do in the page | Browser calls (our own domain) | Forwarded to Express | Status the browser sees |
|---|---|---|---|---|
| Read | open `/gallery` | none: `load()` runs on the server | `GET /api/sketches` | page renders (502 error page if Express is down) |
| Create | fill in the form, **Add sketch** | `POST /api/sketches` | `POST /api/sketches` | 201 |
| Update | click the ☆ / ★ | `PATCH /api/sketches/2` | `PATCH /api/sketches/2` | 200 |
| Delete | click ✕ | `DELETE /api/sketches/2` | `DELETE /api/sketches/2` | 204 |

Open dev tools → Network and watch the requests go to `localhost:5173` (this app), not `3001`.

`updateSketch()` and `deleteSketch()` in `sketchApi.js` return `null` / `false` when Express answers 404, mirroring `sketchData.update()` / `remove()` on the Express side. That lets the route answer **404** for "no such sketch" and **502** for "could not reach Express", two different problems.

## Suggested teaching flow

1. **Read**: load `/gallery`, then stop Express and reload to show the 502 error page (as in demo 16).
2. **Create**: add a sketch. Show the request in the Network tab.
3. **Update**: star a sketch; reload the page and the star is still there.
4. **Delete**: remove a sketch; reload and it is still gone.
5. **Non-persistence**: stop and restart Express (`Ctrl-C`, `npm run dev`), reload `/gallery`. Everything is back to the original four. Ask: *where did the data live?* (In Express's memory, not in the page and not in SvelteKit.)
6. With Express stopped, click ✕ or ☆: the page shows an error line and keeps the list as it was.

## What we left out (deliberately)

- **No CORS**: the browser never calls Express directly, so the CORS conversation is sidestepped, not solved.
- **No real persistence**: Express resets on restart. Week 6 replaces the array with MongoDB.
- **No `$effect`**: the local list is seeded once from `load`'s data with `$state`.
- **No form actions / `use:enhance`**: plain `fetch()` throughout.
- **No optimistic updates**: the page changes only after the server confirms.
- **The page's list is a local copy**: if another browser tab deletes a sketch, this tab will not know until you reload.

## Further reading

- [SvelteKit: Errors](https://svelte.dev/docs/kit/errors)
- [SvelteKit: Environment variables](https://svelte.dev/docs/kit/environment-variables)
- [SvelteKit: Routing, +server.js](https://svelte.dev/docs/kit/routing#server)
- [MDN: HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

## Verification notes

Tested 27 Oct 2026 on Node 22.22.0 / Svelte 5 / SvelteKit 3.1.0 / Vite 8.3.5, against real running servers (`npm run dev` for both).

- `curl` through this app on every verb: `POST` 201; `PATCH` 200, unknown id 404, no body 400, malformed JSON 400; `DELETE` 204, repeat 404, non-numeric id 404.
- Playwright browser test: add (4 to 5 cards), star toggles and survives a reload, delete (5 to 4) survives a reload, then **Express restart restores the original four with stars reset**; with Express stopped, ✕ and ☆ show an error line and leave the list unchanged, and `/gallery` shows the 502 error page.
- `npm run build` succeeds. `npm run check`: **0 errors, 1 warning** (`state_referenced_locally` on `$state(data.sketches)`, expected and accepted as in demo 16).

**Not tested:** deployment; two browser tabs editing at once.
