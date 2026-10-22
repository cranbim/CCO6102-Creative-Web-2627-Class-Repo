/**
 * sketchData.js
 * ------------------------------------------------------------------
 * ALL data access for the Sketch Gallery lives in this one file.
 *
 * WHY THIS SHAPE?
 * Nothing outside this file knows (or should care) that the data
 * currently lives in a plain JavaScript array in memory. The Express
 * routes in index.js only ever call getAll() / create() / update() /
 * remove() — they never touch `sketches` directly.
 *
 * That's deliberate. In Week 6 this array is going to be replaced
 * with a real MongoDB collection via Mongoose. When that happens,
 * these four function SIGNATURES stay exactly the same — only the
 * code INSIDE them changes (array methods -> Mongoose calls). The
 * Express routes in index.js won't need to change at all.
 *
 * This is the same idea as Week 4's $lib/server/neo.js helper — pull the
 * "how do we actually get/change the data" logic into one place, so the
 * rest of the app can stay blissfully unaware of the details.
 *
 * NAMING NOTE: this is deliberately called sketchData.js, not
 * sketchesStore.js. "Store" already means something specific in
 * Svelte — writable()/derived(), or the $state module pattern from
 * Week 3 — and this file has nothing to do with Svelte's reactivity
 * system. It's a plain data-access module on the Express side. Same
 * idea, different name, to avoid that collision.
 * ------------------------------------------------------------------
 */

// --- the "database" (for now) ---------------------------------------------
// A plain in-memory array. IMPORTANT: this resets to the seed data below
// every time the server restarts. Nothing you POST or PATCH survives a
// restart. That's a real limitation, not a bug — Week 6 fixes it properly.

let sketches = [
	{ id: 1, title: 'Pulse Grid', artist: 'Amara', colorTag: '#ff5d5d', favourite: true },
	{ id: 2, title: 'Slow Bloom', artist: 'Ren', colorTag: '#5da9ff', favourite: false },
	{ id: 3, title: 'Static Tide', artist: 'Amara', colorTag: '#5dffb0', favourite: false },
	{ id: 4, title: 'Glass Choir', artist: 'Priya', colorTag: '#f7d65d', favourite: true }
];

// Simple auto-incrementing id, based on whatever the highest existing id is.
// Good enough for an in-memory demo — MongoDB will generate its own real
// ids (_id) for us in Week 6, so this whole nextId dance disappears then.
let nextId = sketches.length + 1;

// --- CRUD operations --------------------------------------------------------

/**
 * READ (all) — return every sketch.
 * @returns {Array<object>}
 */
export function getAll() {
	return sketches;
}

/**
 * READ (one) — return a single sketch by id, or undefined if not found.
 * @param {number} id
 * @returns {object|undefined}
 */
export function getById(id) {
	return sketches.find((s) => s.id === id);
}

/**
 * CREATE — add a new sketch and return it (with its assigned id).
 * @param {{title: string, artist: string, colorTag: string}} data
 * @returns {object} the newly created sketch, including its id
 */
export function create(data) {
	const newSketch = {
		id: nextId++,
		title: data.title,
		artist: data.artist,
		colorTag: data.colorTag,
		favourite: false
	};
	sketches.push(newSketch);
	return newSketch;
}

/**
 * UPDATE — apply a partial set of changes to an existing sketch.
 * @param {number} id
 * @param {object} changes - any subset of {title, artist, colorTag, favourite}
 * @returns {object|null} the updated sketch, or null if no sketch had that id
 */
export function update(id, changes) {
	const sketch = sketches.find((s) => s.id === id);
	if (!sketch) return null;
	Object.assign(sketch, changes);
	return sketch;
}

/**
 * DELETE — remove a sketch by id.
 * @param {number} id
 * @returns {boolean} true if a sketch was removed, false if none matched
 */
export function remove(id) {
	const startLength = sketches.length;
	sketches = sketches.filter((s) => s.id !== id);
	return sketches.length < startLength;
}
