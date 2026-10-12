<script>
	// App.svelte
	// Before and After sit side by side deliberately — same pattern as Week 2's
	// setInterval vs Tone.Transport sequencer comparison. Click Increment in
	// each and watch how the component tree differs, not just the result.
	import PageBefore from './lib/before/PageBefore.svelte';
	import PageAfter from './lib/after/PageAfter.svelte';
	import LabPage from './lib/lab/LabPage.svelte';
</script>

<main>
	<h1>08 — Shared state: props vs .svelte.js + $state</h1>
	<p class="intro">
		Both panels below do the same thing. Open the editor and compare
		<code>lib/before/</code> with <code>lib/after/</code> — same three-level
		component structure, only the plumbing changes.
	</p>

	<div class="comparison">
		<PageBefore />
		<PageAfter />
	</div>

	<hr />

	<LabPage />
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

	:global(.panel) {
		border: 1px solid #ddd;
		border-radius: 8px;
		padding: 1rem;
		background: white;
	}

	:global(.panel-before) {
		border-top: 4px solid #c0392b;
	}

	:global(.panel-after) {
		border-top: 4px solid #27ae60;
	}

	:global(.panel-lab) {
		border-top: 4px solid #2980b9;
		margin-top: 1.5rem;
	}

	:global(.panel-inner) {
		margin-top: 0.75rem;
		padding-left: 0.75rem;
		border-left: 2px dashed #ccc;
	}

	:global(.panel-inner.deep) {
		border-left: 2px solid #999;
	}

	:global(.path) {
		font-size: 0.85rem;
		color: #888;
		margin: 0.25rem 0;
	}

	:global(.count) {
		font-size: 1.5rem;
		font-weight: bold;
		margin: 0.5rem 0;
	}

	:global(.swatch) {
		width: 60px;
		height: 60px;
		border-radius: 6px;
		margin-bottom: 0.5rem;
		border: 1px solid #0002;
	}

	:global(.swatch-buttons) {
		display: flex;
		gap: 0.4rem;
	}

	:global(.swatch-buttons button) {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		border: 1px solid #0002;
		cursor: pointer;
	}

	hr {
		margin: 2rem 0;
		border: none;
		border-top: 1px solid #ddd;
	}
</style>
