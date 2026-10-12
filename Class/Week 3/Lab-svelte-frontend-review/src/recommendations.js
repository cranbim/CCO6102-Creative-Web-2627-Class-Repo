// recommendations.js
// A fake API, same shape as the async/await demo — delay() standing in
// for a real request, written with .then() so this file doesn't do any
// of the async/await work for you.
import { delay } from './delay.js';

/** @type {Record<string, string>} */
const BY_GENRE = {
	fantasy: 'The Name of the Wind — Patrick Rothfuss',
	'sci-fi': 'Project Hail Mary — Andy Weir',
	mystery: 'The Thursday Murder Club — Richard Osman',
	horror: 'Mexican Gothic — Silvia Moreno-Garcia'
};

/** @param {string} genre */
export function getRecommendation(genre) {
	return delay(1000).then(() => {
		return BY_GENRE[genre] ?? "We don't have a pick for that genre yet — try another.";
	});
}
