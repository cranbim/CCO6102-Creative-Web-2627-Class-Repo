// lib/auth.js — ONE helper with ONE job: "who is making this request?"
//
// Express is a separate server. Anyone can send it a request directly, not
// just our SvelteKit app (try-express.js proves it). So Express must check for
// itself. Any route that needs a user calls userFromToken(req) first.

import { findUserByToken } from './userData.js';

// The token arrives in a request header, in the standard format:
//   Authorization: Bearer 3b241101-e2bb-4255-8caf-4136c566a962
// 'Authorization' is the header's standard name; 'Bearer' is the type of
// credential, and means "whoever holds (bears) this token".
//
// Returns the user who holds the token, or null if there is no valid token.
export async function userFromToken(req) {
	const header = req.get('Authorization');

	// No header at all: nobody is logged in.
	if (!header) {
		return null;
	}

	// We only understand the 'Bearer ' type (note the space).
	if (!header.startsWith('Bearer ')) {
		return null;
	}

	// 'Bearer ' is 7 characters long, so the token is everything after them.
	const token = header.slice(7);
	if (token === '') {
		return null;
	}

	// Look the token up in the users collection. No match = not a real token
	// (made up, edited, or crossed off at logout) = null.
	const user = await findUserByToken(token);
	return user;
}
