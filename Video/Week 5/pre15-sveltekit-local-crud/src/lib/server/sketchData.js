/**
 * sketchData.js — ALL the sketch data, and the ONLY way to touch it.
 * ------------------------------------------------------------------
 * This file lives in src/lib/server/. SvelteKit guarantees that anything in a
 * folder called 'server' can never be sent to the browser, so the data below
 * cannot be read or changed from a .svelte component, only from server code
 * (+page.server.js and +server.js files).
 *
 * THE POINT OF THIS FILE: nobody outside it ever touches the `sketches` array.
 * The array is NOT exported. The only things exported are five small functions,
 * one for each job (these are the four CRUD operations, plus a lookup by id):
 *
 *     Create  ->  create(data)
 *     Read    ->  getAll(), getById(id)
 *     Update  ->  update(id, changes)
 *     Delete  ->  remove(id)
 *
 * Why bother? Because the rest of the app only knows these five names. When
 * the data moves into a separate Express server (demo 15), or later into
 * MongoDB (Week 6), we change what is INSIDE these functions and the routes
 * that call them barely change at all.
 *
 * NAMING NOTE: it is called sketchData.js, not sketchStore.js. "Store" already
 * means something specific in Svelte, and this file has nothing to do with
 * Svelte's reactivity. It is a plain data module on the server.
 *
 * LIMITATION (deliberate): the data is a plain array in memory, so it resets to
 * the starting sketches below whenever the server restarts. Editing this file
 * while `npm run dev` is running also restarts it. Week 6 fixes this with a
 * real database.
 * ------------------------------------------------------------------
 */

// The "database" for now. It has no `export`, so no other file can reach it.
// Each sketch looks like this:
// { id: 1, title: 'Pulse Grid', artist: 'Amara', colorTag: '#ff5d5d', favourite: true }
let sketches = [
	{ id: 1, title: 'Pulse Grid', artist: 'Amara', colorTag: '#ff5d5d', favourite: true },
	{ id: 2, title: 'Slow Bloom', artist: 'Ren', colorTag: '#5da9ff', favourite: false },
	{ id: 3, title: 'Static Tide', artist: 'Amara', colorTag: '#5dffb0', favourite: false },
	{ id: 4, title: 'Glass Choir', artist: 'Priya', colorTag: '#f7d65d', favourite: true }
];

// The id the NEXT new sketch will get. MongoDB makes its own ids in Week 6,
// so this counter disappears then.
let nextId = 5;

// A small private helper (not exported). Every function below hands back a COPY
// of a sketch, never the sketch inside the array. If we handed out the real
// one, any file that received it could change it directly and skip our rules,
// which would defeat the whole point of this file. A real database works the
// same way: what you get back is a copy of what is stored.
function copyOf(sketch) {
	return {
		id: sketch.id,
		title: sketch.title,
		artist: sketch.artist,
		colorTag: sketch.colorTag,
		favourite: sketch.favourite
	};
}

// READ (all) — return a copy of every sketch.
export function getAll() {
	const copies = [];
	for (let i = 0; i < sketches.length; i++) {
		copies.push(copyOf(sketches[i]));
	}
	return copies;
}

// READ (one) — return a copy of one sketch by id, or null if no sketch has
// that id.
export function getById(id) {
	const sketch = sketches.find((s) => s.id === id);
	if (!sketch) return null;
	return copyOf(sketch);
}

// CREATE — add a new sketch and return a copy of it, including the id we gave
// it. `data` looks like { title, artist, colorTag }. The route that calls this
// has already checked those three fields exist, and every new sketch starts as
// not a favourite.
export function create(data) {
	const newSketch = {
		id: nextId,
		title: data.title,
		artist: data.artist,
		colorTag: data.colorTag,
		favourite: false
	};
	nextId = nextId + 1;
	sketches.push(newSketch);
	return copyOf(newSketch);
}

// UPDATE — change some fields of one sketch and return a copy of the changed
// sketch, or null if no sketch has that id.
// `changes` can hold any of title, artist, colorTag, favourite. We only copy
// across the fields we recognise, so a stray field (or an attempt to change
// the id) is ignored.
export function update(id, changes) {
	const sketch = sketches.find((s) => s.id === id);
	if (!sketch) return null;

	if (changes.title !== undefined) sketch.title = changes.title;
	if (changes.artist !== undefined) sketch.artist = changes.artist;
	if (changes.colorTag !== undefined) sketch.colorTag = changes.colorTag;
	if (changes.favourite !== undefined) sketch.favourite = changes.favourite;

	return copyOf(sketch);
}

// DELETE — remove one sketch. Returns true if a sketch was removed, false if
// no sketch had that id (so the route can answer 404 instead of pretending).
export function remove(id) {
	const countBefore = sketches.length;
	sketches = sketches.filter((sketch) => sketch.id !== id);
	return sketches.length < countBefore;
}
