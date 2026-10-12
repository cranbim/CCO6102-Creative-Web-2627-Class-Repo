<script>
	import SketchCard from '#lib/SketchCard.svelte';
	import { sketches } from '#lib/sketches.js';
</script>

<h1>Gallery</h1>

<p>
	Every card below is the same <code>SketchCard.svelte</code> component from
	<code>#lib</code>, one per entry in the shared <code>sketches</code> array. Click one to
	see the dynamic route in action.
</p>

<div class="grid">
	{#each sketches as sketch (sketch.slug)}
		<SketchCard {sketch} />
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}
</style>
