// src/hooks.server.js — the bouncer at the door.
//
// The file name matters: SvelteKit looks for exactly 'src/hooks.server.js',
// and calls its 'handle' function before EVERY request to our app — every
// page, every form action. So this is the one place that answers
// "who is this visitor?" for the whole site.

import { callExpress } from '#lib/server/api.js';

export async function handle({ event, resolve }) {
	// Start by assuming nobody is logged in.
	// event.locals is a box SvelteKit hands to every load function and form
	// action for THIS ONE request. Whatever we put in it here, they can read.
	event.locals.user = null;

	// The browser sends our cookie automatically with every request.
	const token = event.cookies.get('session');

	if (token) {
		// Ask Express: "who holds this token?" (GET /me)
		const result = await callExpress('GET', '/me', null, token);

		if (result.status === 200) {
			event.locals.user = result.data.user;
		} else {
			// Express doesn't recognise the token (made up, edited, or logged out
			// elsewhere), so throw the useless cookie away.
			event.cookies.delete('session', { path: '/' });
		}
	}

	// resolve() means "carry on and build the page as normal".
	// (Asking Express on every single request is simple, not fast — real apps
	// often remember the answer for a while. Simple wins this week.)
	return resolve(event);
}
