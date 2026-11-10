// my-posts/+page.server.js — LAB 3: a protected 'My posts' page.
//
// ===========================================================================
// LAB 3 — build a protected "My posts" page
// ---------------------------------------------------------------------------
// Goal: a page that shows ONLY the logged-in user's own posts.
//
// Express first (22-express-users-api):
//   1. lib/postData.js — write getPostsByAuthor(author). (TODO is in the file.)
//   2. server.js — add GET /my-posts. (TODO is in the file.)
//
// Then here, in load() below:
//   3. If there is no locals.user, redirect(303, '/login') — copy wall/.
//   4. Get the token with cookies.get('session'), then
//        const result = await callExpress('GET', '/my-posts', null, token);
//   5. return { posts: result.data.posts };
//   6. In +page.svelte, list the posts with {#each} — copy the wall page.
//
// TIP: you don't send Express a username. The token says who you are, so
//      Express can only ever give you YOUR posts.
//
// A correct result looks like:
//   • logged in, /my-posts lists only your posts, newest first;
//   • logged out, /my-posts sends you to /login;
//   • try-express.js against GET /my-posts with no token gets 401.
//
// STRETCH 1: show "My posts (3)" in the nav — the layout would need the count.
// STRETCH 2: a Delete button on each of your posts. Express: DELETE
//   /posts/:id must check the post's author is the token's user, and answer
//   403 (Forbidden: we know who you are, but this isn't yours) if not.
// ===========================================================================

import { redirect } from '@sveltejs/kit';
import { callExpress } from '#lib/server/api.js';

export async function load({ locals, cookies }) {
	// LAB 3 — steps 3 to 5 go here.
	return { posts: [] };
}
