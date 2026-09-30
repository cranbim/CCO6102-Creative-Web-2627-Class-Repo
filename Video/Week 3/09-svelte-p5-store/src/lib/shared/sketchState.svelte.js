// sketchState.svelte.js
//
// Same pattern as Track 1's counterState.svelte.js this week: a .svelte.js
// module exporting a $state object, mutated via a named function rather
// than reassigned directly.
//
// The point here specifically: this ONE object is read by both a DOM
// slider (inside a normal Svelte component) AND a p5 sketch's draw() loop
// (running on p5's own animation frame, outside Svelte's component tree
// entirely). Neither side owns a separate copy — there is exactly one
// `size` value in the whole app.

export const sketchState = $state({
	size: 60
});

export function setSize(px) {
	sketchState.size = px;
}
