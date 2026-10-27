# Creative Web — Week 6 Code Demos & Artefacts (Step 2b)

## What's in here

- **`18-express-mongo-api/`** — the new code demo. Week 5's
  `15-express-sketch-api` rewritten to use MongoDB Atlas via Mongoose.
  Same routes, same field shapes. `lib/sketchData.js` is the file that
  changed — see its own comments and the outline tab's row 15.
  Includes `lab-solution-reference/` (tutor-only, row 16's lab worked
  through) and a real test suite (`npm test`).

- **`Deployment_Guide_Vercel_Railway.md`** — the deployment guide
  artefact owed since Week 5. Vercel (frontend) + Railway (backend) +
  Atlas (already cloud-hosted), step by step.

- **`Week6_Compatibility_Notes.md`** — what was actually checked against
  your real Week 5 `16-sveltekit-sketch-gallery` and
  `17-svelte-p5-sketch-viz` projects (uploaded 7/9/26), and the one real
  fix found: a `Number(params.id)` landmine in the PATCH lab's scaffold
  comment that breaks against MongoDB's string ids. **Worth reading
  before the session** — this affects a file you already have, not
  anything in this delivery.

## What was and wasn't possible to verify here

This sandbox has no network path to MongoDB Atlas, Vercel, or Railway.
Everything above was built and tested as far as that constraint allows —
real syntax checks, a real test suite against mocked Mongoose calls, a
real connection-FAILURE path tested against a live (fake) URI, and a full
real HTTP/SvelteKit integration test using genuine Mongoose `Document`
objects (real ObjectIds, no live DB needed for that part) standing in for
Atlas. Full details, and exactly what still needs Dave's own pass before
teaching, are in `18-express-mongo-api/README.md`.

## Quick start

```bash
cd 18-express-mongo-api
npm install
cp .env.example .env    # then paste in a real Atlas connection string
npm run dev
```
