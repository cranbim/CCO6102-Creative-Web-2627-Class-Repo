// A tiny in-memory "data store": just an array that lives in the server's
// memory while it runs. This file is under src/lib/server/, so SvelteKit
// guarantees it can only ever be imported by server code — never by a page
// running in the browser.
//
// Two functions, getAll() and create(): the later Express and MongoDB weeks
// keep this same shape, so only what's INSIDE these functions will change.
//
// Because the data lives in memory, restarting the dev server resets it
// to the seed list below. (Persistence is a later week's job.)

/** @typedef {{ id: number, text: string, author: string }} Idea */

/** @type {Idea[]} */
const ideas = [
	{ id: 1, text: 'A website that slowly changes colour as the day goes on', author: 'Ash' },
	{ id: 2, text: 'A guestbook where every message becomes a particle', author: 'Bo' },
	{ id: 3, text: 'A map of places that only exist at night', author: 'Cass' }
];

let nextId = ideas.length + 1;

/** @returns {Idea[]} */
export function getAll() {
	return ideas;
}

/**
 * @param {{ text: string, author: string }} data
 * @returns {Idea}
 */
export function create({ text, author }) {
	const idea = { id: nextId++, text, author };
	ideas.push(idea);
	return idea;
}
