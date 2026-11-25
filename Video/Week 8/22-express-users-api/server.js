// server.js — the Week 8 users API.
//
// Same shape as the Sketch Gallery API (18-express-mongo-api): connect to
// MongoDB with Mongoose, then answer requests with plain req/res handlers.
// New this week: users, logging in, and routes that check WHO is asking.
//
// Who calls this server? Our SvelteKit app, from ITS server side. The browser
// never talks to Express directly this week, so there is no cors() here.

import 'dotenv/config'; // reads .env into process.env (MONGODB_URI, PORT)
import express from 'express';
import mongoose from 'mongoose';
import { User, createUser, findUserByUsername, startSession, endSession } from './lib/userData.js';
import { getAllPosts, createPost } from './lib/postData.js';
import { userFromToken } from './lib/auth.js';

const app = express();
app.use(express.json()); // turns a JSON request body into req.body

const PORT = process.env.PORT || 3001;

// ---------------------------------------------------------------------------
// PUBLIC routes: anyone may call these. You don't need to be logged in to
// register or to log in!
// ---------------------------------------------------------------------------

// POST /register  body: { username, password }
app.post('/register', async (req, res) => {
	// LAB 1 PART A — hop 4: add console.log('hop 4: Express /register got', req.body)

	// LAB 1 — step 3: also read req.body.favouritePlant, and pass it to
	// createUser below as the third argument.
	const username = req.body.username;
	const password = req.body.password;

	// 400 = Bad Request: the caller left something out.
	if (!username || !password) {
		return res.status(400).json({ message: 'Username and password are both required.' });
	}

	try {
		const user = await createUser(username, password);
		// 201 = Created: a new user document now exists.
		res.status(201).json({ user: user });
	} catch (err) {
		// 11000 is MongoDB's "duplicate key" code: the unique index on username
		// refused a second user with the same name. With the whole class sharing
		// one database, this WILL happen.
		if (err.code === 11000) {
			// 409 = Conflict: the request clashes with what is already stored.
			return res.status(409).json({ message: 'That username is taken — try another.' });
		}
		// Anything else is our problem, not the caller's. 500 = Server Error.
		console.log(err);
		res.status(500).json({ message: 'Could not register.' });
	}
});

// POST /login  body: { username, password }
app.post('/login', async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	const user = await findUserByUsername(username);

	// Plain-text comparison, for today. Note we give the SAME message whether
	// the username or the password was wrong — don't tell a stranger which
	// usernames exist. 401 = Unauthorized: "we don't know who you are".
	if (!user || user.password !== password) {
		return res.status(401).json({ message: 'Wrong username or password.' });
	}

	// Correct! Hand out a new session token (the wristband).
	const token = await startSession(user);

	// 200 = OK. The token goes back to SvelteKit, which keeps it in a cookie.
	res.json({ token: token, user: user });
});

// GET /posts — the class wall. Reading is public; WRITING is not (below).
app.get('/posts', async (req, res) => {
	const posts = await getAllPosts();
	res.json({ posts: posts });
});

// ---------------------------------------------------------------------------
// PROTECTED routes: each one starts by asking userFromToken(req) "who is this?"
// and answers 401 if the answer is nobody.
// ---------------------------------------------------------------------------

// GET /me — "who does this token belong to?" SvelteKit's hooks.server.js asks
// this on every page load.
app.get('/me', async (req, res) => {
	const user = await userFromToken(req);
	if (!user) {
		return res.status(401).json({ message: 'Not logged in.' });
	}
	res.json({ user: user });
});

// POST /logout — cross the token off the list. Even a copy of the token
// (in try-express.js, say) stops working after this.
app.post('/logout', async (req, res) => {
	const user = await userFromToken(req);
	if (!user) {
		return res.status(401).json({ message: 'Not logged in.' });
	}
	await endSession(user);
	res.json({ message: 'Logged out.' });
});

// POST /posts  body: { text }
app.post('/posts', async (req, res) => {
	const user = await userFromToken(req);
	if (!user) {
		return res.status(401).json({ message: 'Log in to post.' });
	}

	const text = req.body.text;
	if (!text) {
		return res.status(400).json({ message: 'A post needs some text.' });
	}

	try {
		// THE KEY LINE OF THE WEEK: the author comes from the user we found with
		// the token — never from req.body. If we trusted req.body.author, anyone
		// could post as anyone.
		const post = await createPost(text, user.username);
		res.status(201).json({ post: post });
	} catch (err) {
		// Most likely the 280-character limit in the schema.
		res.status(400).json({ message: 'Could not save that post (280 characters max).' });
	}
});

// LAB 3 — step 2: add GET /my-posts here.
//   1. Ask userFromToken(req) who this is; answer 401 if nobody (copy /me).
//   2. Call getPostsByAuthor(user.username) — import it at the top first.
//   3. Answer res.json({ posts: posts }).
// Notice: the caller never says WHOSE posts. Express works it out from the
// token, so nobody can ask for someone else's "my posts".

// ---------------------------------------------------------------------------
// Start up: connect to MongoDB first, then start listening.
// ---------------------------------------------------------------------------

// await means: pause here until MongoDB answers, then carry on.
await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });

// 'unique' on username is a MongoDB index. User.init() waits until that index
// exists, so the very first duplicate is refused too (Mongoose FAQ).
await User.init();

app.listen(PORT, () => {
	console.log('Users API listening on http://localhost:' + PORT);
});
