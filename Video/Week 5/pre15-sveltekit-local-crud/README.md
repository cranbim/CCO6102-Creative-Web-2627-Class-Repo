# pre15 — Sketch Gallery with all CRUD, data kept in a server module

**Purpose:** a stepping stone before demo 15. It is the same Sketch Gallery as demos 15 and 16, with the same four operations (Create, Read, Update, Delete), but the sketch data lives in ONE file inside SvelteKit instead of in a separate Express server.

The big idea: **the data can only be changed by calling functions. Nothing can reach into the array directly.** Once students see that, moving the data to Express (demo 15) is only a change of what is *inside* those functions.

Builds on: demo 12b (ideasStore, Local API), Week 4 (`load()`, `+server.js`).
Leads to: demo 15 (Express), demo 16 (error handling), Week 6 (MongoDB).

## How this project was created

```
npx sv create pre15-sveltekit-local-crud --template minimal --no-types --no-add-ons --install npm
```

- `--template minimal` — the bare-bones SvelteKit app
- `--no-types` — plain JavaScript, no TypeScript
- `--no-add-ons` — skip the optional extras menu
- `--install npm` — run `npm install` straight away

**No `.env` file is needed.** There are no environment variables in this demo (demo 15 adds the first one, the Express address).

## Run it

```
npm install
npm run dev
```

Then open the address it prints (usually http://localhost:5173).

## Routes

| URL | File | What it does |
|---|---|---|
| `/` | `src/routes/+page.svelte` | Signpost page |
| `/gallery` | `src/routes/gallery/+page.server.js` and `+page.svelte` | `load()` reads the sketches; the page shows them and has the add / favourite / delete controls |
| `/api/sketches` | `src/routes/api/sketches/+server.js` | `GET` list, `POST` create |
| `/api/sketches/[id]` | `src/routes/api/sketches/[id]/+server.js` | `PATCH` update, `DELETE` remove |

## CRUD map

| CRUD | `sketchData.js` function | HTTP verb and URL | Success status | Other statuses |
|---|---|---|---|---|
| Create | `create(data)` | `POST /api/sketches` | 201 Created | 400 bad or missing body, 500 our fault |
| Read (all) | `getAll()` | `GET /api/sketches` (and `load()` on `/gallery`) | 200 | — |
| Read (one) | `getById(id)` | not wired to a route yet | — | — |
| Update | `update(id, changes)` | `PATCH /api/sketches/2` | 200 | 400 bad body, 404 no such id, 500 |
| Delete | `remove(id)` | `DELETE /api/sketches/2` | 204 No Content | 404 no such id, 500 |

`getById` is there to complete the set and for the Express version to copy. A `GET /api/sketches/[id]` route is a good stretch exercise.

## The "no direct access" point

Open `src/lib/server/sketchData.js` and look for three things:

1. The `sketches` array has **no `export`**. No other file can see it.
2. Every function **returns a copy**, never the real object. A caller who changes the copy changes nothing stored.
3. `update()` only copies across the fields it recognises, so a request cannot change an `id` or invent new fields.

The file sits in `src/lib/server/`. SvelteKit refuses to bundle anything from a `server` folder into browser code, so a `.svelte` component cannot import it even by mistake. That is why the gallery page uses `fetch()` to talk to the API routes instead.

## Suggested teaching flow

1. Open `sketchData.js`. Read the header comment, then each function. Ask: "How would any other file get at the array?" (It can't.)
2. Open `api/sketches/+server.js`. Each handler checks the request, calls one `sketchData` function, and answers with a status code. Compare with 12b.
3. Open `api/sketches/[id]/+server.js`. Same shape, plus `params.id` turned into a number.
4. Open `gallery/+page.server.js` (one line of real work) then `+page.svelte` (three functions, one per verb).
5. Run it. Add a sketch, star one, delete one. Visit `/api/sketches` and see the JSON change.
6. Try to break it: `curl -X PATCH localhost:5173/api/sketches/2 -H "Content-Type: application/json" -d '{"id": 99}'` — the id does not change.

## How this maps onto demos 15 and 16

| Here (pre15) | In demo 15 (Express) |
|---|---|
| `sketchData.getAll()` in `load()` | `fetch(expressUrl + '/sketches')` in `load()` |
| `sketchData.create(...)` in `POST` | `fetch(expressUrl + '/sketches', { method: 'POST', ... })` in `POST` |
| `sketchData.update(...)` in `PATCH` | `fetch(expressUrl + '/sketches/' + id, { method: 'PATCH', ... })` |
| `sketchData.remove(...)` in `DELETE` | `fetch(expressUrl + '/sketches/' + id, { method: 'DELETE' })` |
| `sketchData.js` itself | moves into the Express server, as its own array and routes |

The browser code (`+page.svelte`) does not change at all.

## What we left out (on purpose)

- **No persistence.** The array resets when the server restarts. Saving the file while `npm run dev` is running also restarts it. Week 6 adds MongoDB.
- **No error handling in `load()`.** If `getAll()` ever threw, the page would show SvelteKit's default error. Demo 16 adds the proper handling, because with Express a network failure becomes possible.
- **No validation library.** Just a few plain `if` checks.
- **No authentication.** Anyone can delete anything.
- **No `$effect`.** Not taught yet.
- **No lab or tutor solution.** All four operations are already working here. The PATCH and DELETE practice happens in the Week 5 lab, on Express.

## Further reading

- SvelteKit: [Server-only modules](https://svelte.dev/docs/kit/server-only-modules)
- SvelteKit: [Routing — +server.js](https://svelte.dev/docs/kit/routing#server)
- MDN: [HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- MDN: [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

## What was checked

Tested against a real running dev server:

- `curl` on every verb and edge case: list, create (201), create with missing field / no body / bad JSON / `null` (all 400), update (200), update unknown or non-numeric id (404), update with no body or `null` (400), unknown fields and `id` changes ignored, delete (204), delete again (404).
- A Playwright browser test: add a sketch (4 to 5 cards), toggle favourite, reload and see it persist, delete (back to 4), no console errors.
- `npm run build` succeeds.
- `svelte-check`: 0 errors, 1 warning (`state_referenced_locally` on `$state(data.sketches)`, which is the intended behaviour and is explained in a comment).

Not tested: deployment, behaviour of the data reset under hot-module reload beyond the note above.

Versions used: SvelteKit 3.1.0, Svelte 5, Vite 8.3.5, Node 22.22.0.
