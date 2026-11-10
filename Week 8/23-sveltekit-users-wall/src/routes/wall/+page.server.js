// wall/+page.server.js — the class wall: a PROTECTED page.

import { fail, redirect } from '@sveltejs/kit';
import { callExpress } from '#lib/server/api.js';

// load runs on the server before the page is shown.
export async function load({ locals }) {
	// THE PROTECTION: hooks.server.js has already worked out who this is.
	// Nobody? Send them to log in, before the page is ever built.
	// (Typing /wall into the address bar doesn't get round this — it runs on
	// every request, on the server.)
	if (!locals.user) {
		redirect(303, '/login');
	}

	const result = await callExpress('GET', '/posts');
	return { posts: result.data.posts };
}

export const actions = {
	default: async ({ request, cookies, locals }) => {
		if (!locals.user) {
			redirect(303, '/login');
		}

		const formData = await request.formData();
		const text = formData.get('text');

		// Send the post to Express WITH the token. Notice we do NOT send the
		// author: Express works out who is posting from the token itself.
		const token = cookies.get('session');
		const result = await callExpress('POST', '/posts', { text: text }, token);

		if (result.status !== 201) {
			return fail(result.status, { message: result.data.message });
		}

		// No redirect needed: after an action, SvelteKit runs load() again and
		// shows this page, so the new post appears.
	}
};
