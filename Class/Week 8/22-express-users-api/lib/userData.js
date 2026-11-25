// lib/userData.js — everything to do with USERS in the database lives here.
//
// Same idea as sketchData.js in Weeks 5 and 6: the routes in server.js never
// talk to Mongoose directly, they call the small functions below. If we ever
// change how users are stored, this is the only file that changes.

import mongoose from 'mongoose';
import crypto from 'node:crypto';

// The schema: what a user document looks like.
const userSchema = new mongoose.Schema(
	{
		// unique: true asks MongoDB to build a "unique index" on username, so the
		// database itself refuses a second user called 'dave'. (It is an index,
		// not a check Mongoose does for us — see User.init() in server.js.)
		username: { type: String, required: true, unique: true },

		// PLAIN TEXT, on purpose, for today only. Open Atlas and you can read
		// every password — that is the problem bcrypt solves (post-study task).
		password: { type: String, required: true },

		// LAB 1 — step 1: add a favouritePlant field here, written like the two
		// fields above. A String that is not required is fine.

		// The session token: a long random code handed out at login. Whoever
		// holds it IS this user, as far as our app is concerned. null = logged out.
		sessionToken: { type: String, default: null }
	},
	{
		toJSON: {
			// Include the 'id' virtual (the string version of _id), as in Week 6.
			virtuals: true,
			// transform runs every time a user is turned into JSON to send out.
			// We delete the two secrets so Express can NEVER send them back by
			// accident, whichever route returns a user.
			transform: function (doc, ret) {
				delete ret.password;
				delete ret.sessionToken;
				delete ret._id;
				delete ret.__v;
				return ret;
			}
		}
	}
);

// The model: the object we use to find and save users. Mongoose names the
// collection after it: 'User' becomes the 'users' collection.
export const User = mongoose.model('User', userSchema);

// Create a new user. If the username is taken, MongoDB throws an error with
// code 11000 ("duplicate key") — the register route turns that into a 409.
export async function createUser(username, password) {
	// LAB 1 PART A — hop 5: add console.log('hop 5: createUser saving', username)
	console.log("hop5 create username",username)
	// LAB 1 — step 2: add favouritePlant as a third parameter of this function
	// and save it below, the same way as username and password.
	const user = await User.create({ username: username, password: password });
	return user;
}

// Find one user by username, or null if there isn't one.
export async function findUserByUsername(username) {
	const user = await User.findOne({ username: username });
	return user;
}

// Give a user a brand-new session token and save it.
// A new token at every login replaces the old one, so only the most recent
// login works — try logging in as the same user in two browsers (Lab 2).
export async function startSession(user) {
	// crypto.randomUUID() is built into Node. It makes a random code like
	// '3b241101-e2bb-4255-8caf-4136c566a962' — 122 random bits, far too many
	// to guess (OWASP asks for at least 64).
	const token = crypto.randomUUID();
	user.sessionToken = token;
	await user.save();
	return token;
}

// Find the user who holds this token, or null if nobody does.
export async function findUserByToken(token) {
	const user = await User.findOne({ sessionToken: token });
	return user;
}

// Log out: cross the token off the list, so it never works again.
export async function endSession(user) {
	user.sessionToken = null;
	await user.save();
}
