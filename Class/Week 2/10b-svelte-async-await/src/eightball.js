// eightball.js
// Same shape as fortunes.js — delay() standing in for a real wait, no
// async/await used here either.
import { delay } from './delay.js';

const ANSWERS = [
	'Yes, definitely.',
	'Ask again later.',
	'Outlook not so good.',
	'Without a doubt.',
	'My sources say no.',
	'It is certain.'
];

export function askThe8Ball() {
	return delay(1000).then(() => {
		return ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
	});
}
