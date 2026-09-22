// fortunes.js
// A fake API — no real network call, just delay() standing in for one.
// Written with .then() on purpose, not async/await: this file's job is
// to hand back a Promise, not to teach the new syntax. That happens in
// After.svelte, the first place async/await actually appears.
import { delay } from './delay.js';

const FORTUNES = [
	'A well-placed semicolon will bring you luck.',
	'Today your code will run on the first try. (It will not.)',
	'An old bug will resurface when you least expect it.',
	'Refactor now — future you will thank present you.',
	'A stranger will ask you to turn it off and on again.'
];

export function getFortune() {
	return delay(2000).then(() => {
		return FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
	});
}
