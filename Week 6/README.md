# Creative Web — Week 6 Code Demos & Artefacts (Step 2b)

## What's in here

- **`18-express-mongo-api/`** — the new code demo. Week 5's
  `15-express-sketch-api` rewritten to use MongoDB Atlas via Mongoose.
  Same routes, same field shapes. `lib/sketchData.js` is the file that
  changed — see its own comments and the outline tab's row 15.
  Includes `lab-solution-reference/` (tutor-only, row 16's lab worked
  through) and a real test suite (`npm test`).



## Quick start

```bash
cd 18-express-mongo-api
npm install
cp .env.example .env    # then paste in a real Atlas connection string
npm run dev
```
