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


## Further reading

- SvelteKit form actions: https://svelte.dev/docs/kit/form-actions
- SvelteKit hooks (`handle`, `locals`): https://svelte.dev/docs/kit/hooks
- Svelte tutorial, reading and writing cookies: https://svelte.dev/tutorial/kit/cookies
- MDN, Set-Cookie (`HttpOnly`, `Max-Age`): https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie


