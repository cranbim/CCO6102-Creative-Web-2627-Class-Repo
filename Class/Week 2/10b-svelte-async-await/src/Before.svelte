<script>
	// Before.svelte — THE PROBLEM
	// getFortune() doesn't hand back a fortune — it hands back a Promise,
	// a stand-in for a value that isn't ready yet. Nothing below is wrong
	// syntax. It just doesn't do what it looks like it should.
	import { getFortune } from './fortunes.js';

	/** @type {string | Promise<string>} */
	let fortune = $state('(click the button)');

	function revealFortune() {
		fortune = getFortune();
	}
</script>

<section>
	<h2>Before — the problem</h2>
	<button onclick={revealFortune}>Reveal my fortune</button>
	<p class="fortune">{fortune}</p>
	<p class="note">
		👆 That's not a bug in Svelte — <code>getFortune()</code> really
		did return that. It's a Promise: a placeholder for a value that
		isn't ready yet. We need a way to say "wait for it" — that's
		exactly what <code>async</code>/<code>await</code> is for.
	</p>
</section>

<style>
	.fortune {
		font-weight: bold;
		min-height: 1.5em;
	}

	.note {
		font-size: 0.85rem;
		color: #a94442;
		background: #fdf2f2;
		border: 1px solid #f5c6cb;
		border-radius: 4px;
		padding: 0.5rem;
	}
</style>
