// counterState.svelte.js
//
// THE PATTERN TAUGHT THIS WEEK: a .svelte.js module exporting a $state object,
// whose properties any importing component can read AND mutate directly.
//
// Why ".svelte.js" and not plain ".js"?
// Runes ($state, $derived, $effect) only work inside .svelte files, or inside
// .svelte.js / .svelte.ts files. Rename this to counterState.js and it breaks.
//
// Why an OBJECT, not a plain number?
//   export const counter = $state(0);       // looks tempting...
// ...doesn't work. Reassigning an exported primitive from another file loses
// Svelte's ability to track it, and throws a compiler error (state_invalid_export).
// Wrapping it in an object sidesteps this: we never reassign `counter` itself,
// we only ever mutate a PROPERTY of it (counter.count++), which Svelte can track.

export const counter = $state({
	count: 0
});

export function increment() {
	counter.count += 1;
}

export function reset() {
	counter.count = 0;
}
