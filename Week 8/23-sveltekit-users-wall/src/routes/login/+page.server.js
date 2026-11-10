// login/+page.server.js — receives the login form, and starts the session.

import { fail, redirect } from '@sveltejs/kit';
import { callExpress } from '#lib/server/api.js';

// COOKIE LIFETIME, in SECONDS (not milliseconds!).
// 60 * 60 * 3 = 10800 seconds = 3 hours.
// Try 120 (2 minutes) to watch a session run out — see the Expires column in
// DevTools → Application → Cookies.
const COOKIE_LIFETIME = 60 * 60 * 3;

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		// Express checks the password. If it's right, it creates a token and
		// sends it back to us.
		const result = await callExpress('POST', '/login', {
			username: username,
			password: password
		});

		if (result.status !== 200) {
			return fail(result.status, { message: result.data.message });
		}

		// Give the browser its wristband: a cookie called 'session' holding the
		// token. From now on the browser sends it with every request to our site.
		cookies.set('session', result.data.token, {
			path: '/', // send it to every page of the site (already the default — written so you can see it)
			httpOnly: true, // page JavaScript can't read it (already the default — written so you can see it)
			maxAge: COOKIE_LIFETIME // how long until the browser throws it away
		});

		redirect(303, '/wall');
	}
};
