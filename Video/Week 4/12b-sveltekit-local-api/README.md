# 12b — Pages, and an API of our own

A small multi-page SvelteKit site where one page talks to **an API route that lives inside the same project**. The data is a plain JavaScript array on the server. No external service, no API key, no `.env`.

**Teaching order: 14 → 12b → 12 → 13.**
Demo 14 shows routing and layouts with no data. This demo adds the single new idea of a `+server.js` endpoint with `GET` and `POST`, on data you can see. Demos 12 and 13 then use the same kind of file to call NASA.

*Numbering note: 12b was added after 12 and 13 were built, to fill the gap between 14 and 12. It keeps its "12b" name so existing references stay valid.*

## Creating this project from scratch

```bash
npx sv create 12b-sveltekit-local-api --template minimal --types jsdoc --no-add-ons --install npm
```

This is the same command style as demo 14: minimal template, JSDoc type comments (not TypeScript), no add-ons. Then delete the default `src/routes` contents and add the files below.

## Run it

```bash
npm install
npm run dev
```

Open the address Vite prints (usually http://localhost:5173).

## What is in it

```
src/
  lib/server/ideasStore.js        the data: an array + getAll() and create()
  routes/
    +layout.svelte                nav, shared by every page
    +page.svelte                  Home       →  /
    about/+page.svelte            About      →  /about
    ideas/+page.svelte            Ideas      →  /ideas   (button + form call the API)
    lab/+page.svelte              Lab        →  /lab     (finished checker page)
    api/ideas/+server.js          THE API    →  /api/ideas   (GET and POST)
```

## The teaching points

1. **`+page.svelte` makes a page, `+server.js` makes an endpoint.** Both are found by folder path. A page returns HTML for a person; an endpoint returns data for code.
2. **Exported function names are HTTP methods.** `export function GET` answers GET requests, `export async function POST` answers POST. Methods you don't export get **405 Method Not Allowed**.
3. **You can visit a GET route in the browser.** Open `/api/ideas` directly and you see the raw JSON. The "Load ideas" button does exactly that request using `fetch`.
4. **POST carries data in the body.** The form sends JSON; the server checks it and answers with a status code: **201** created, **400** bad input.
5. **Status codes are the API's way of talking back.** The Ideas page keeps a request log so you can watch `GET /api/ideas → 200`, `POST /api/ideas → 201` and so on.
6. **Where the data lives.** The array is on the server in `src/lib/server/ideasStore.js`, so every visitor sees the same list. Restarting the dev server resets it. The Express and MongoDB weeks keep this `getAll()` / `create()` shape and swap what is inside.

`async` / `await` appears for the first time in `ideas/+page.svelte`, with a plain-language comment. It is explained properly in Week 5.

## No `.env`, no key, no `load()`

Deliberately absent: API keys, `.env`, `+page.server.js` and `load()`. Those come in demo 12, once students are comfortable with the idea that a `+server.js` file is just a function that answers a request.

## Lab: routing as an API

Open `/lab`. Each button sends a request to a URL in this project and shows the status code that comes back. The page is finished; your job is to make the checks pass by creating routes.

**Before you start, predict:** which buttons will succeed, and what will the others return?

### Core task

1. Create the file `src/routes/api/ideas/count/+server.js`.
2. Export a `GET` function that returns `{ count: <number of ideas> }`. Use `json()` and `getAll()` as `api/ideas/+server.js` does.
3. Click **GET /api/ideas/count**. You should see `200` and a count.
4. Add an idea on the Ideas page, then check the count again.
5. Click **POST /api/ideas/count**. You did not export `POST` from that file, so you should see **405**. Explain in one sentence why.

### Stretch

Create `src/routes/api/ideas/[id]/+server.js`, a **dynamic** API route. Export `GET({ params })` that returns the single idea whose `id` matches `params.id`, or a **404** (`json({ error: '…' }, { status: 404 })`) if there is none. Check `GET /api/ideas/1` (200) and try `/api/ideas/99` in the address bar (404).

Hint: `params.id` is a string; ids in the array are numbers.

### Questions to answer

- Why does `/api/ideas/count` not get caught by the `[id]` route? (Static folders win over dynamic ones.)
- What changes if two files both export `GET`, but live in different folders?
- Which part of this project is "the page" and which is "the API"? How could you tell from file names alone?

### Expected results

| Button | Before | After core task | After stretch |
|---|---|---|---|
| GET /api/ideas | 200 | 200 | 200 |
| GET /api/ideas/count | 404 | 200 | 200 |
| POST /api/ideas/count | 404 | 405 | 405 |
| GET /api/ideas/1 | 404 | 404 | 200 |

A tutor reference solution is supplied separately (`12b-lab-solution-TUTOR.zip`), not in this project.

## Verification notes (tutor)

Built and checked on a fresh SvelteKit 3.0.1 scaffold (`npm run build` and `npm run check`, 0 errors, 0 warnings), then tested against `npm run preview`:

- Pages `/`, `/about`, `/ideas`, `/lab` return 200.
- `GET /api/ideas` returns the seed array; valid `POST` returns 201 with the new idea; empty text and malformed JSON return 400.
- With the lab solution added: count returns 200, `POST` to it returns 405, `/api/ideas/1` returns 200 and `/api/ideas/99` returns 404. The static `count` route wins over `[id]`.
- Without the solution, both new URLs return 404, as the table above expects.
- **If you test with curl:** a bare `curl -X POST` with no `Content-Type` and no `Origin` header gets a **403** from SvelteKit's cross-site-request check, not a 405. Browsers send `Origin` automatically, so the lab page shows 405. With curl add `-H "Content-Type: application/json"` to see the 405.
- The browser clicks themselves (the Ideas page and Lab page buttons) were not exercised in a real browser here; worth one run-through before class.
