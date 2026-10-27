# Deploying the Sketch Gallery — Vercel + Railway + Atlas

*Week 6 deployment guide artefact. Owed since Week 5 (deployment was cut
entirely per Dave's steer, 2/9/26) — built now regardless of whether the
in-class segment (row 17 of the outline tab) ends up live, architecture-only,
or post-study-only. Either way, this is the thing students follow.*

---

## The shape of it

Three separate services, same as the three separate `npm run dev`
processes you already run locally:

| Local (dev)                      | Deployed                                    |
|-----------------------------------|----------------------------------------------|
| SvelteKit app (`localhost:5173`)  | **Vercel**                                    |
| Express + Mongoose API (`:3001`)  | **Railway**                                   |
| MongoDB Atlas (already cloud-hosted) | **Atlas** — nothing to deploy, already there |

Nothing about *how* these three talk to each other changes. The SvelteKit
app still only ever reaches Express server-to-server (via `SKETCH_API_URL`)
— never from the browser. That means there's still no CORS conversation to
have here, same as every week since Week 4.

**Deploy Express first.** You need its public URL before you can set
`SKETCH_API_URL` when deploying the SvelteKit app.

---

## Part 1 — Deploy the Express API to Railway

Official guide: [Railway — Deploy an Express App](https://docs.railway.com/guides/express)

1. Push `18-express-mongo-api` to its own GitHub repo (Railway deploys from
   a repo, not a local folder upload).
2. At [railway.app](https://railway.app), **New Project → Deploy from GitHub repo**,
   and pick that repo. Railway auto-detects it's a Node app.
3. Under the new service's **Variables** tab, add:
   - `MONGODB_URI` — your Atlas connection string (same value you use
     locally in `.env`, straight from Atlas's **Connect → Drivers** screen —
     see [Atlas — Connect to Your Cluster](https://www.mongodb.com/docs/atlas/tutorial/connect-to-your-cluster/)).
   - **Don't set `PORT` yourself** — Railway injects its own `PORT` value
     automatically, and `index.js`'s `process.env.PORT || 3001` already
     falls back correctly either way.
4. Under **Settings → Networking**, click **Generate Domain** to get a
   public URL (something like `18-express-mongo-api-production.up.railway.app`).
5. Once it's deployed, sanity-check it directly:
   ```bash
   curl https://<your-railway-domain>/api/sketches
   ```
   You should get back the same JSON shape you've been testing locally
   (an array of sketch documents, each with `_id` and `id`).

**If it doesn't connect:** check the Railway deploy logs for
`[mongo] connection FAILED` — almost always a copy-paste issue in
`MONGODB_URI` (a literal `<password>` left in, or the wrong database name),
or Atlas's **Network Access** list not including `0.0.0.0/0` (allow from
anywhere) — Railway's outbound IPs aren't fixed, so this is normally
required unless you're on Atlas's paid tier with a static IP.

---

## Part 2 — Deploy the SvelteKit app to Vercel

Official guides: [Vercel — SvelteKit](https://vercel.com/docs/frameworks/full-stack/sveltekit) ·
[SvelteKit — adapter-vercel](https://svelte.dev/docs/kit/adapter-vercel)

1. In the SvelteKit project (`16-sveltekit-sketch-gallery` or
   `17-svelte-p5-sketch-viz`), install the Vercel adapter:
   ```bash
   npm i -D @sveltejs/adapter-vercel
   ```
2. In `svelte.config.js`, swap the adapter:
   ```js
   import adapter from '@sveltejs/adapter-vercel';
   // ...
   export default {
   	kit: {
   		adapter: adapter()
   	}
   };
   ```
   (`adapter-auto`, the default from `npx sv create`, would actually also
   detect Vercel automatically at deploy time — but installing
   `adapter-vercel` explicitly, per the official guide, lets you set
   Vercel-specific options later if you ever need them.)
3. Push this project to its own GitHub repo (separate from the Express
   repo — these are two independent deployments, matching the two
   independent `npm run dev` processes).
4. At [vercel.com](https://vercel.com), **Add New → Project**, import that
   repo. Vercel auto-detects SvelteKit.
5. Before the first deploy, add an environment variable:
   - `SKETCH_API_URL` — the Railway URL from Part 1
     (`https://<your-railway-domain>`, no trailing slash).
   - This is a **private** env var (no `PUBLIC_` prefix) — same reasoning
     as the local `.env`: it's only ever read server-side
     (`+page.server.js`, `+server.js`), never shipped to the browser.
     Vercel's default env var scope already keeps it server-only, matching
     `$env/static/private`'s behaviour.
6. Deploy. Vercel gives you a public URL
   (`your-project.vercel.app`).

---

## Testing the deployed app

1. Visit `https://your-project.vercel.app/gallery` (or `/viz` for the p5
   version) — should load real data from the deployed Express API.
2. Add a sketch via the form — confirm it appears, then reload the page to
   confirm it's genuinely persisted (not just a client-side illusion).
3. Open MongoDB Compass, connect to the same Atlas cluster, and confirm
   the new document is actually sitting in the `sketches` collection —
   the same READ/CREATE visibility check from row 15, now against the
   real deployed stack instead of localhost.

---

## What this guide has and hasn't been checked against

Written directly from the official Vercel, SvelteKit, and Railway docs
linked above (all verified live, Step 2a, 7/9/26) and from how
`18-express-mongo-api` and Week 5's SvelteKit projects are actually built
and were tested (Step 2b, 7/9/26) — env var names, adapter setup, and the
server-to-server request shape all match the real code, not a generic
template.

**Not yet tested**: an actual live deploy to real Vercel/Railway accounts.
This sandbox has no network path to either platform (same constraint as
Atlas — see `18-express-mongo-api/README.md`). Before teaching this
live, Dave should run through it once for real — ideally as part of
confirming row 17's actual time cost (a real "click through both
dashboards" pass will surface anything this guide's written form can't,
like exact click-paths or UI copy that's since changed).
