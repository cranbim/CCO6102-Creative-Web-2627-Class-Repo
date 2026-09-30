<script>
	// LabEightBall.svelte — LAB EXERCISE, starts here.
	//
	// This has the same bug as Before.svelte, in a new context. Run the
	// app and click the button once — you should see something like
	// "[object Promise]", same as Before's broken version.
	//
	// TODO: fix it the same way After.svelte does. Two changes, both in
	// this file:
	//   1. Add the `async` keyword before `askQuestion`.
	//   2. Add `await` before `askThe8Ball()`, on the line inside it.
	// That's the whole fix — no other changes needed.
	import { askThe8Ball } from './eightball.js';

	/** @type {string | Promise<string>} */
	let answer = $state('(ask a question)');

	function askQuestion() {
		answer = askThe8Ball();
	}
</script>

<section>
	<h2>Lab — your turn: fix the magic 8-ball</h2>
	<button onclick={askQuestion}>🎱 Ask the 8-ball</button>
	<p class="answer">{answer}</p>
</section>

<!--
	STRETCH CHALLENGE (once the fix above is working):
	Add a `thinking` boolean, the same idea as `loading` in After.svelte —
	disable the button and show "Shaking the ball…" while waiting for
	an answer, then restore the button once it resolves.
-->

<style>
	.answer {
		font-weight: bold;
		min-height: 1.5em;
	}
</style>
