// logout/+page.server.js — the "Log out" button in the nav posts here.
//
// Logging out is two jobs:
//   1. tell Express to cross the token off the list (so it never works again)
//   2. delete the cookie from the browser
//
// There is no +page.svelte here: nobody visits this page, the button just
// posts to it and is redirected home.

import { redirect } from '@sveltejs/kit';
import { callExpress } from '#lib/server/api.js';

export const actions = {
	default: async ({ cookies }) => {
		const token = cookies.get('session');

		if (token) {
			await callExpress('POST', '/logout', null, token);
		}

		// Deleting needs the same path the cookie was set with.
		cookies.delete('session', { path: '/' });

		redirect(303, '/');
	}
};
