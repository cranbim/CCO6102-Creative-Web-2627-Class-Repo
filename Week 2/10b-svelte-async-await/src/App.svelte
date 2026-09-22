<script>
	// App.svelte
	// Three independent sections — separate components, separate state.
	// Same "run multiple versions side by side" shape as other demos.
	import Before from './Before.svelte';
	import After from './After.svelte';
	import LabEightBall from './LabEightBall.svelte';
</script>

<main>
	<h1>async / await</h1>
	<p class="intro">
		Same fake "API" (a delayed fortune cookie), two ways — then a lab
		with a fresh scenario to practice on.
	</p>

	<div class="demos">
		<Before />
		<After />
		<LabEightBall />
	</div>
</main>

<style>
	main {
		max-width: 460px;
		margin: 2rem auto;
		font-family: system-ui, sans-serif;
	}

	.intro {
		color: #555;
		font-size: 0.9rem;
	}

	.demos {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	:global(h2) {
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
	}

	:global(button) {
		margin-bottom: 0.5rem;
	}
</style>
