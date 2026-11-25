// +layout.server.js — runs on the server for EVERY page under this layout.
// It passes the user that hooks.server.js found to every page, so the nav bar
// can say who is logged in. (null = nobody.)

export function load({ locals }) {
	return { user: locals.user };
}
