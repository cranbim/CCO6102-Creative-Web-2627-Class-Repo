# 23-sveltekit-users-wall — Week 8 class wall

A SvelteKit app with:
- a public landing page;
- a **pretend** login (built to fail);
- register and login pages using **form actions**;
- a real **session** (an httpOnly cookie checked in `hooks.server.js`);
- a protected class **wall**.

It talks to `22-express-users-api`, which must be running.

## Set up (do the .env step first)

1. `cp .env.example .env`. `EXPRESS_URL` is already `http://localhost:3001`.
2. `npm install`
3. Start Express first, in its own terminal. Then `npm run dev` here.

The project was created with `npx sv create 23-sveltekit-users-wall --template minimal --no-types --no-add-ons --install npm`. That gives:
- `minimal`: an empty starter;
- `--no-types`: plain JavaScript;
- `--no-add-ons`: nothing extra;
- `npm`: the package manager.

SvelteKit 3 conventions are as in Weeks 4–7: the `#lib` alias, `src/env.js`, and no `svelte.config.js`.

**Three terminals this week:** Express, SvelteKit, and a spare for `try-express.js`. Know which `console.log` appears where.

## Routes

| Route | Teaches |
|---|---|
| `/` | A public page; shows who is logged in, if anyone |
| `/pretend`, `/pretend/secret` | **The problem.** A `$state` "login" in the browser. Refresh, type the URL, or use a second browser, and it fails |
| `/register` | A form action: `request.formData()`, then `fail()` or `redirect(303, …)` |
| `/login` | A form action that sets the `session` cookie (httpOnly, `maxAge` in seconds) |
| `/logout` | An action only, with no page: Express crosses the token off, and the cookie is deleted |
| `/wall` | **Protected.** `load()` redirects to `/login` if there is no `locals.user`. Posting sends the token, never the author |
| `/my-posts` | **Lab 3** starter |

| File | Job |
|---|---|
| `src/hooks.server.js` | Runs before every request: cookie, then `GET /me`, then `event.locals.user` |
| `src/routes/+layout.server.js` | Passes `locals.user` to every page (the nav bar) |
| `src/lib/server/api.js` | `callExpress()`, the one place that knows the Express URL and adds the `Authorization` header |
| `src/lib/pretendLogin.svelte.js` | The pretend `$state` flag (the Week 3 shared-state pattern) |

## Labs

| Lab | Where | What |
|---|---|---|
| Lab 1, part A | hop markers in `register/+page.svelte`, `register/+page.server.js` and `lib/server/api.js` | Trace one register request through all four layers (worksheet) |
| Lab 1, part B | `LAB 1` steps 4–6 | `favouritePlant`: form, then action, then the home page |
| Lab 2 | no code | Session Detective worksheet: predict, try, explain |
| Lab 3 | `my-posts/` | Protected load, `GET /my-posts`, list your posts |

Tutor solutions are in `Creative_Web_Week8_Lab_Solutions_TUTOR.zip`, which is not part of the student zip.

## What we left out (on purpose)

- `use:enhance`. Every form is plain HTML and works with JavaScript switched off (tested).
- Error pages for "Express isn't running": you get SvelteKit's 500.
- Caching the `/me` answer. Express is asked on every request, which is simple rather than fast.
- `app.d.ts`, the file where TypeScript would be told about `locals.user`. See the verification notes.

## Further reading

- SvelteKit form actions: https://svelte.dev/docs/kit/form-actions
- SvelteKit hooks (`handle`, `locals`): https://svelte.dev/docs/kit/hooks
- Svelte tutorial, reading and writing cookies: https://svelte.dev/tutorial/kit/cookies
- MDN, Set-Cookie (`HttpOnly`, `Max-Age`): https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie

## Verification notes (10/11/26)

- **Versions:** SvelteKit 3.1.1, Svelte 5.57.3, Vite 8.3.7, Node 22.23. `npm run build` is clean.
- **Playwright, against `vite preview` and the running Express API (27/27 passed):**
  - register, then the 409 message on a duplicate, then a wrong-password message, then login to `/wall`;
  - cookie is httpOnly, `path=/`, and lives about 3 hours; `document.cookie` does not show it;
  - posting works, and two users in two browser contexts see each other's posts;
  - the same user logging in elsewhere sends the first browser to `/login`, and the dead cookie is removed;
  - an edited cookie value sends you to `/login`;
  - logout clears the cookie, and `/wall` then redirects;
  - all three pretend tests behave as designed;
  - login and posting work **with JavaScript disabled**.
- **Cookie lifetime, on a copy with `COOKIE_LIFETIME = 4` seconds:** after expiry `/wall` redirects to `/login`. The token itself was **still accepted by Express (201)**, which is Lab 2's "two clocks" result. An action route with no `+page.svelte` (`/logout`) works.
- **svelte-check: not 0/0.** Two findings:
  - With `--no-types`, SvelteKit 3 only generates route types when `typescript` is installed. Without it, svelte-check reports missing `./$types.js` for every route.
  - With TypeScript 6 installed, 11 errors remain. All come from strict type-checking of plain JavaScript (`"strict": true` in the scaffold's `jsconfig.json`): implicit `any` parameters in `api.js`, and `locals.user` not being declared. None affect running the app.
  - Verified fix, **not applied** (Dave to decide): `"strict": false` in `jsconfig.json`, plus a 7-line `src/app.d.ts` declaring `App.Locals`, gives 0 errors and 0 warnings.
- **NOT tested:**
  - real MongoDB Atlas (FerretDB was used; see the Express README);
  - a deployed (https) version;
  - opening the site from a phone over plain http via the laptop's network address. SvelteKit's default `secure` cookie flag would stop the browser storing the cookie there; localhost is treated as secure and works.
