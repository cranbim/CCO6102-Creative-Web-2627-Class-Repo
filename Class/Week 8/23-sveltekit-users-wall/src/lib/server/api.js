// src/lib/server/api.js — the ONE place that knows how to talk to Express.
//
// It lives in a folder called 'server', so SvelteKit guarantees it can never
// be sent to the browser (same rule as Week 4's neo.js). Every load function,
// every form action and hooks.server.js call Express through this helper.

import { EXPRESS_URL } from '$app/env/private';

// callExpress('POST', '/login', { username: 'sam', password: 'pw' })
// callExpress('GET', '/me', null, token)
//
// Gives back an object with the status code and the JSON Express sent, e.g.
//   { status: 401, data: { message: 'Wrong username or password.' } }
export async function callExpress(method, path, body, token) {
	const headers = { 'Content-Type': 'application/json' };

	// If we have a session token, send it in the standard Authorization header.
	// Express's userFromToken() reads it from there.
	if (token) {
		headers.Authorization = 'Bearer ' + token;
	}

	const options = { method: method, headers: headers };

	// Only POST requests carry a body. JSON.stringify turns the object into text.
	if (body) {
		options.body = JSON.stringify(body);
	}

	// LAB 1 PART A — hop 3: add console.log('hop 3: api.js calling Express', method, path)
	console.log(" i received a call for express",method,path,body)
	// await means: pause until Express answers, then carry on.
	// (What if Express isn't running? The page shows a 500 error — we keep
	// error handling minimal this week so the flow stays easy to follow.)
	const response = await fetch(EXPRESS_URL + path, options);
	const data = await response.json();
	return { status: response.status, data: data };
}
