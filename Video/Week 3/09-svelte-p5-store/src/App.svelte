<script>
	import DuplicatedSketch from './lib/before/DuplicatedSketch.svelte';
	import SharedSketch from './lib/after/SharedSketch.svelte';
	import LabSketch from './lib/lab/LabSketch.svelte';
</script>

<main>
	<h1>09 — DOM controls + p5, via shared state</h1>
	<p class="intro">
		Compare the two sketches below: same slider, same circle, same p5 code
		shape — the only difference is whether "size" exists in one place or two.
	</p>

	<div class="comparison">
		<DuplicatedSketch />
		<SharedSketch />
	</div>

	<hr />

	<LabSketch />
</main>

<style>
	:global(body) {
		font-family: system-ui, sans-serif;
		background: #fafafa;
		color: #222;
	}

	main {
		max-width: 900px;
		margin: 2rem auto;
		padding: 0 1rem;
	}

	.intro {
		color: #555;
	}

	.comparison {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	:global(.demo) {
		border: 1px solid #ddd;
		border-radius: 8px;
		padding: 1rem;
		background: white;
	}

	:global(.demo-before) {
		border-top: 4px solid #c0392b;
	}

	:global(.demo-after) {
		border-top: 4px solid #27ae60;
	}

	:global(.demo-lab) {
		border-top: 4px solid #2980b9;
		margin-top: 1.5rem;
	}

	:global(.demo canvas) {
		display: block;
		margin-bottom: 0.75rem;
		border-radius: 6px;
	}

	:global(.warning) {
		font-size: 0.85rem;
		color: #a94442;
		background: #fdf2f2;
		border: 1px solid #f5c6cb;
		border-radius: 4px;
		padding: 0.5rem;
		margin-top: 0.75rem;
	}

	hr {
		margin: 2rem 0;
		border: none;
		border-top: 1px solid #ddd;
	}
</style>
