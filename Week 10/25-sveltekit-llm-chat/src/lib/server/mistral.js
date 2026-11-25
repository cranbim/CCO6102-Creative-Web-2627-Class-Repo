/**
 * src/lib/server/mistral.js — the ONE place this app talks to Mistral.
 * ------------------------------------------------------------------
 * askMistral(messages) sends a list of messages to Mistral's chat API and
 * gives back the text of the reply. That is its only job.
 *
 * This file lives in src/lib/server/, so the API key it uses can never be
 * sent to the browser: the same rule as the NASA key in Week 4.
 * ------------------------------------------------------------------
 */

import { MISTRAL_API_KEY } from '$app/env/private';
import { MAX_REPLY_TOKENS, TEMPERATURE } from '#lib/server/chatRules.js';

// Mistral's chat endpoint, and the model we ask. mistral-small-latest is the
// model Mistral uses in its own first-request guide.
const MISTRAL_URL = 'https://api.mistral.ai/v1/chat/completions';
const MODEL = 'mistral-small-latest';

export async function askMistral(messages) {
	// await means: pause here until Mistral answers, then carry on.
	// "Authorization: Bearer <key>" is the same header shape as Week 8's
	// session token: whoever holds this key may use the API.
	const res = await fetch(MISTRAL_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + MISTRAL_API_KEY
		},
		body: JSON.stringify({
			model: MODEL,
			messages: messages,
			max_tokens: MAX_REPLY_TOKENS,
			temperature: TEMPERATURE
		})
	});

	// 429 = Too Many Requests: the whole class shares one Mistral account,
	// and the account has a limit on requests per second. We give this one
	// its own error so the route can say so.
	if (res.status === 429) {
		throw new Error('RATE_LIMIT');
	}

	// Any other problem (401 = wrong key, 5xx = Mistral is having trouble).
	if (!res.ok) {
		throw new Error('Mistral responded with ' + res.status);
	}

	// Mistral's answer looks like this (shortened):
	// { choices: [ { message: { role: 'assistant', content: 'Water it when...' } } ] }
	// We want the content of the first (and only) choice.
	const data = await res.json();
	return data.choices[0].message.content;
}
