# 15_FullCRUD — Express Sketch Gallery API (all four verbs)

**Week 5, Track 1, "full CRUD" variant.** This is demo 15 with the lab finished: `GET`, `POST`, `PATCH` and `DELETE` are all implemented. Use it to *see* every CRUD verb working end to end, and to see that the data is only in memory.

Pair it with `16_FullCRUD_sveltekit-sketch-gallery`, which has the matching UI (add, star, delete).

**Differences from demo 15**

- `index.js`: the `PATCH /api/sketches/:id` and `DELETE /api/sketches/:id` routes are written (the lab TODO block is gone).
- `lib/sketchData.js`: `update()` now copies only `title`, `artist`, `colorTag` and `favourite`, so a request cannot change an `id` or add stray fields. (Demo 15 loops over every key with `for...in`.)
- No `lab-solution-reference/` folder: there is no lab here.

## Creating this project from scratch

A plain Node/Express project, so no `sv create` step:

```bash
mkdir 15_FullCRUD_express-sketch-api && cd 15_FullCRUD_express-sketch-api
npm init -y
npm install express
npm install --save-dev nodemon
```

Then add `"type": "module"` to `package.json` and a `dev` script that runs `nodemon index.js`.

## Run it

```bash
npm install
npm run dev
```

Starts on **http://localhost:3001**. No `.env` needed. Use `npm start` if you do not want nodemon restarting while you demo (a restart resets the data, see below).

**Port 3001:** the original `15-express-sketch-api` uses the same port, so run only one of them at a time.

## CRUD map

| CRUD | Route | `sketchData` function | Success | Other statuses |
|---|---|---|---|---|
| Create | `POST /api/sketches` | `create(data)` | 201 Created | 400 missing fields, 500 |
| Read | `GET /api/sketches` | `getAll()` | 200 | 500 |
| Update | `PATCH /api/sketches/:id` | `update(id, changes)` | 200 | 400 no body, 404 no such id, 500 |
| Delete | `DELETE /api/sketches/:id` | `remove(id)` | 204 No Content | 404 no such id, 500 |

## Try every verb with curl

```bash
# Read
curl http://localhost:3001/api/sketches

# Create
curl -X POST http://localhost:3001/api/sketches \
  -H "Content-Type: application/json" \
  -d '{"title":"New Piece","artist":"You","colorTag":"#ff00ff"}'

# Update (star sketch 2)
curl -X PATCH http://localhost:3001/api/sketches/2 \
  -H "Content-Type: application/json" \
  -d '{"favourite": true}'

# Delete (sketch 3)
curl -i -X DELETE http://localhost:3001/api/sketches/3

# Delete it again: now a 404
curl -i -X DELETE http://localhost:3001/api/sketches/3
```

## See the non-persistence

1. Make some changes (add, star, delete) and `GET /api/sketches` to confirm they stuck.
2. Stop the server (`Ctrl-C`) and start it again.
3. `GET /api/sketches`: the original four sketches are back, and every change is gone.

The `sketches` array in `lib/sketchData.js` is rebuilt from its seed data every time the process starts. That is not a bug, it is the gap Week 6's MongoDB work closes. Note that nodemon also restarts the server (and so resets the data) whenever you save a file.

## What we left out (deliberately)

- **No real persistence**: see above.
- **No validation library**: the 400 check is three plain `if` conditions.
- **No auth**: anyone who can reach port 3001 can create, change or delete anything.
- **Malformed JSON gets Express's default HTML 400 page**, not a JSON error. `express.json()` rejects it before our route runs. A custom error-handling middleware would fix that; it is not taught yet.

## Further reading

- [Express: Routing](https://expressjs.com/en/guide/routing.html)
- [MDN: HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [MDN: HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

## Verification notes

Built and tested on Node 22.22.0 / Express 5.3.0, 27 Oct 2026, against a real running `node index.js` with `curl` and a Playwright browser test through the paired SvelteKit app.

- `GET` → 200, four seeded sketches
- `POST` valid → 201 with new id
- `PATCH` valid → 200; a body containing `id` and an unknown field changed neither; unknown id and non-numeric id → 404; no body → 400
- `DELETE` valid → 204; repeat → 404
- Restart → seed data restored, all changes gone (confirmed in the browser)

**Not tested:** `PATCH` with a body that is valid JSON but not an object (e.g. an array); deployment.
