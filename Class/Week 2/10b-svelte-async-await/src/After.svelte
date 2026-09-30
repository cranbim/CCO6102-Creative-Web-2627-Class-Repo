<script>
	// After.svelte — THE FIX
	// Two new keywords. `async` before the function — this marks the
	// function as one that's allowed to pause partway through. `await`
	// before the call — this pauses THIS function (not the whole page,
	// not other buttons) until the Promise settles, then hands back the
	// real value instead of the Promise wrapper.
	import { getFortune } from './fortunes.js';

	let fortune = $state('(click the button)');
	let loading = $state(false);

	async function revealFortune() {
		// loading = true;
		fortune = await getFortune();
		// loading = false;
	}
</script>

<section>
	<h2>After — async/await</h2>
	<button onclick={revealFortune} disabled={loading}>
		{loading ? 'Consulting the cookie…' : 'Reveal my fortune'}
	</button>
	<p class="fortune">{fortune}</p>
</section>

<style>
	.fortune {
		font-weight: bold;
		min-height: 1.5em;
	}
</style>
