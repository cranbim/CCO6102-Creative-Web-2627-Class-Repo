/**
 * src/routes/api/chat/+server.js — the chat route (POST /api/chat)
 * ------------------------------------------------------------------
 * An API route, like demo 12b: the folder path is the URL (/api/chat) and
 * the exported function name is the HTTP method (POST).
 *
 * The page sends the whole conversation here. This route checks it, puts
 * the service prompt in front of it, and asks Mistral for a reply.
 * The browser never sees the service prompt or the API key.
 * ------------------------------------------------------------------
 */

import { json } from '@sveltejs/kit';
import { askMistral } from '#lib/server/mistral.js';
import { MAX_MESSAGE_LENGTH, MAX_HISTORY } from '#lib/server/chatRules.js';

// The ?raw at the end of this line is a Vite feature. It means: don't treat
// this file as code — give me everything in it as one plain string of text.
// So servicePrompt now holds the words written in service-prompt.txt.
// Vite does this when the app is built, so the text travels with the app
// wherever it runs. (To try the other prompt, change the file name to
// service-prompt-cactus.txt.)
import servicePrompt from '#lib/server/service-prompt.txt?raw';

export async function POST({ request }) {
	// request.json() reads the JSON body the page sent. If the body is
	// missing or broken it throws, so it gets its own try/catch.
	// 400 = Bad Request: the caller sent something we cannot use.
	let body;
	try {
		body = await request.json();
	} catch (err) {
		return json({ error: 'Send a JSON body' }, { status: 400 });
	}

	// The page sends: { messages: [ { role: 'user', content: 'Hi' }, ... ] }
	// Array.isArray checks that we really got a list.
	const history = body.messages;
	if (!Array.isArray(history) || history.length === 0) {
		return json({ error: 'Send a list of messages' }, { status: 400 });
	}

	// The newest message must be the user's, and must be text.
	// typeof tells us what kind of value something is ('string' = text).
	const newest = history[history.length - 1];
	if (newest.role !== 'user' || typeof newest.content !== 'string' || newest.content.trim() === '') {
		return json({ error: 'Type a message first' }, { status: 400 });
	}

	// A rule the server enforces, whatever the model would do (see chatRules.js).
	if (newest.content.length > MAX_MESSAGE_LENGTH) {
		return json(
			{ error: 'Messages can be at most ' + MAX_MESSAGE_LENGTH + ' characters' },
			{ status: 400 }
		);
	}

	// Build the list we send to Mistral. The service prompt always goes first,
	// with the role 'system' (that is what Mistral calls a service prompt).
	const messages = [{ role: 'system', content: servicePrompt }];

	// Then only the most recent messages. slice(-6) means "the last 6 items".
	const recent = history.slice(-MAX_HISTORY);

	// Never trust the browser (Week 8's lesson): someone could send their own
	// 'system' message to replace ours. So we copy across only 'user' and
	// 'assistant' messages that contain text, and drop everything else.
	// (A browser could still invent an earlier 'assistant' reply. Stopping that
	// means keeping the conversation on the server: left out on purpose.)
	for (const message of recent) {
		const allowedRole = message.role === 'user' || message.role === 'assistant';
		if (allowedRole && typeof message.content === 'string') {
			messages.push({ role: message.role, content: message.content });
		}
	}

	try {
		// await means: pause here until Mistral answers, then carry on.
		const reply = await askMistral(messages);
		return json({ reply: reply });
	} catch (err) {
		console.error('Mistral request failed:', err.message);

		// 429 = Too Many Requests: pass it on, with a message a person can act on.
		if (err.message === 'RATE_LIMIT') {
			return json(
				{ error: 'Too many messages at once across the class. Wait a few seconds and try again.' },
				{ status: 429 }
			);
		}

		// 502 = Bad Gateway: we could not get an answer from the service behind us.
		return json({ error: 'Could not get an answer from Mistral' }, { status: 502 });
	}
}
