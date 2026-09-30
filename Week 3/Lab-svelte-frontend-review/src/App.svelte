<script>
	// App.svelte
	// Three independent exercises — separate data, separate state, same
	// "run side by side" shape as every other demo/lab so far. Attempt
	// them in any order; none depends on the others.
	import Exercise1_Shelf from './Exercise1_Shelf.svelte';
	import Exercise2_Progress from './Exercise2_Progress.svelte';
	import Exercise3_Recommend from './Exercise3_Recommend.svelte';
</script>

<main>
	<h1>Frontend Svelte — Review Lab</h1>
	<p class="intro">
		Three exercises, roughly easiest to hardest. Do them in order, or
		skip straight to whichever matches how you're feeling — nothing
		here depends on anything else here.
	</p>

	<div class="exercises">
		<Exercise1_Shelf />
		<Exercise2_Progress />
		<Exercise3_Recommend />
	</div>
</main>

<style>
	main {
		max-width: 480px;
		margin: 2rem auto;
		font-family: system-ui, sans-serif;
	}

	.intro {
		color: #555;
		font-size: 0.9rem;
	}

	.exercises {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	:global(h3) {
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
	}
</style>
