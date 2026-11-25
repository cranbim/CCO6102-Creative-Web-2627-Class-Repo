// register/+page.server.js — receives the register form.
//
// The file name matters: '+page.server.js' only ever runs on the server.
// Exporting 'actions' with a 'default' function makes it a FORM ACTION:
// SvelteKit calls it when a <form method="POST"> on this page is submitted.

import { fail, redirect } from '@sveltejs/kit';
import { callExpress } from '#lib/server/api.js';

export const actions = {
	default: async ({ request }) => {
		// The form arrives as "form data". Each .get() names an input's 'name'.
		const formData = await request.formData();
		const username = formData.get('username');
		const password = formData.get('password');
		// LAB 1 — step 5: also get 'favouritePlant', and send it to Express in
		// the object below, next to username and password.

		// LAB 1 PART A — hop 2: add console.log('hop 2: register action got', username)
		console.log("I recieved a new user:",username)
		const result = await callExpress('POST', '/register', {
			username: username,
			password: password
		});

		// 201 = Created. Anything else (400 missing field, 409 username taken)
		// goes back to the page. fail() is RETURNED: it sends the status code and
		// this object to the page as 'form'. We send the username back too, so
		// the page could refill the box.
		if (result.status !== 201) {
			return fail(result.status, { message: result.data.message, username: username });
		}

		// Success: send the browser to the login page.
		// 303 = "See Other": go and GET this page instead. A refresh then reloads
		// the login page rather than submitting the form a second time.
		// redirect() is simply CALLED — it stops the function by itself.
		redirect(303, '/login');
	}
};
