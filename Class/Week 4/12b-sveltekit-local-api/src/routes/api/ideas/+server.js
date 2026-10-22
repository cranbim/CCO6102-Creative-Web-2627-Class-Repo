// An API route. A +server.js file inside src/routes/ is an ENDPOINT, not a
// page: it has no HTML, it just answers requests. The folder path IS the URL:
//
//   src/routes/api/ideas/+server.js   →   /api/ideas
//
// Each function you export is named after an HTTP method. Export GET and the
// route answers GET requests; export POST and it answers POST requests.
// Anything you don't export gets a "405 Method Not Allowed" from SvelteKit.
import { json } from '@sveltejs/kit';
import { getAll, create } from '#lib/server/ideasStore.js';

// GET /api/ideas — "give me the list".
// json() builds a proper Response: the data turned into JSON text, with the
// right content-type header. Try opening /api/ideas straight in the browser.
/** @type {import('./$types').RequestHandler} */
export function GET() {
	let allIdeas=getAll()
	console.log(allIdeas)
	return json(allIdeas);
}

// POST /api/ideas — "here is a new idea, please add it".
// The data arrives in the request body. We never trust it blindly: check it,
// and answer with a status code that says what happened.
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	let body;
	try {
		body = await request.json();
	} catch (err) {
		return json({ error: 'Please send valid JSON.' }, { status: 400 });
	}

	const text = typeof body.text === 'string' ? body.text.trim() : '';
	const author = typeof body.author === 'string' ? body.author.trim() : '';

	if (text.length === 0 || text.length > 140) {
		return json({ error: 'An idea needs between 1 and 140 characters.' }, { status: 400 });
	}

	const idea = create({ text, author: author || 'anonymous' });

	// 201 means "Created" — the conventional answer to a successful POST.
	return json(idea, { status: 201 });
}
