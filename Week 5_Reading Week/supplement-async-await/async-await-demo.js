/**
 * async-await-demo.js
 * ------------------------------------------------------------------
 * SUPPLEMENT — not part of the main Week 5 teaching flow this week.
 * See the outline tab's "SUPPLEMENT" block and the Week 5 README for
 * where this might be used: a pre-study primer, a short standalone
 * teaching moment, or just a self-serve reading link.
 *
 * Run this with:  node async-await-demo.js
 *
 * There's no project to set up — this is deliberately "a few lines",
 * not a full app, run directly with plain Node.
 * ------------------------------------------------------------------
 */

console.log('--- PART 1: a normal, synchronous function ---');

function makeToast() {
	console.log('  Toast is ready.');
	return 'toast';
}

console.log('Before makeToast()');
const result1 = makeToast();
console.log('After makeToast() — got:', result1);

// Notice: those three lines happen in order, one at a time, with no
// surprises. That's synchronous code — the normal kind you've been
// writing all along.

console.log('\n--- PART 2: a function that takes TIME (a Promise) ---');

/**
 * A Promise represents "a value that isn't ready yet, but will be."
 * setTimeout here is standing in for anything slow — a network
 * request, reading a file, waiting for a database. The important
 * part isn't setTimeout, it's the shape: this function returns a
 * Promise immediately, and the actual value arrives later.
 * @returns {Promise<string>}
 */
function makeToastSlowly() {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve('toast (but slower)');
		}, 1000);
	});
}

console.log('Before makeToastSlowly()');
const promise = makeToastSlowly();
console.log('Right after calling it, we have:', promise);
console.log('(Notice: that logged a Promise object, NOT "toast (but slower)".');
console.log(' The value genuinely is not ready yet — this line ran before');
console.log(' the 1 second timer finished.)');

// If you wanted the ACTUAL VALUE out of that promise, the old way was
// .then(). We're not focusing on that here — async/await (part 3) is
// a cleaner way to get the same result.

console.log('\n--- PART 3: async / await — the same thing, written to LOOK synchronous ---');

/**
 * The `async` keyword before a function means two things:
 *   1. This function always returns a Promise (even if you don't
 *      explicitly build one — plain return values get wrapped
 *      automatically).
 *   2. You're now allowed to use `await` inside it.
 *
 * `await` pauses this function (ONLY this function — the rest of the
 * program keeps running) until the Promise it's waiting on settles,
 * then hands you the actual resolved value.
 */
async function serveBreakfast() {
	console.log('  Starting breakfast...');
	const toast = await makeToastSlowly(); // <-- pauses HERE for ~1 second
	console.log('  Got:', toast);
	console.log('  Serving!');
	return toast;
}

console.log('Calling serveBreakfast()...');
serveBreakfast().then(() => {
	console.log('\n--- PART 4: this is EXACTLY what has been happening since Week 4 ---');
	console.log('Every time you\'ve written:');
	console.log('    const res = await fetch(someUrl);');
	console.log('...inside an `async function load() { ... }` — THIS is what was going on.');
	console.log('`fetch()` returns a Promise immediately (like makeToastSlowly() above).');
	console.log('`await` pauses until the real response arrives, then hands it to you.');
	console.log('Nothing new is required to use fetch() correctly — you were already doing it.');
	console.log('This demo just makes the "why" visible.');
});

console.log('(This line runs BEFORE "Starting breakfast..." finishes —');
console.log(' async functions don\'t block the rest of the program.)');
