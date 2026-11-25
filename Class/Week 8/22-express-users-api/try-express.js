// try-express.js — talk to Express DIRECTLY, with no browser and no SvelteKit.
//
// Run it in a third terminal, while Express is running:   node try-express.js
//
// It answers the question: "SvelteKit checks the cookie — but what stops
// someone skipping SvelteKit and posting straight to Express?"

// Paste a real token between the quotes to try test 2.
// Where from? Atlas → ClassWall → users → your user → sessionToken.
const TOKEN = 'paste-a-token-here';

const EXPRESS_URL = 'http://localhost:3001';

// TEST 1: post to the wall with NO token at all.
const first = await fetch(EXPRESS_URL + '/posts', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({ text: 'Posted with no token!', author: 'anyone-i-like' })
});
console.log('Test 1, no token:  ', first.status, await first.json());

// TEST 2: the same post, carrying a token in the Authorization header.
// Note we ALSO send author: 'anyone-i-like' — look at who the post is really from.
const second = await fetch(EXPRESS_URL + '/posts', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + TOKEN
	},
	body: JSON.stringify({ text: 'Posted from try-express.js', author: 'anyone-i-like' })
});
console.log('Test 2, with token:', second.status, await second.json());

// What to expect:
//   Test 1 → 401 every time.
//   Test 2 → 401 with the placeholder; 201 with a real token, and the post's
//            author is the token's owner, NOT 'anyone-i-like'.
//   Log out in the browser and run it again → 401: the token was crossed off.
