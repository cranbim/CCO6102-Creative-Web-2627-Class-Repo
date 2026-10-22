<script>
	import SketchCard from '#lib/SketchCard.svelte';
	import { sketches } from '#lib/sketches.js';

	// The folder is named [slug] — square brackets mean "this segment is
	// a parameter, not a literal folder name". Visiting /gallery/pulse-grid
	// matches this route with params.slug === 'pulse-grid'.
	//
	// SvelteKit gives every +page.svelte a `params` prop directly — no
	// load function needed for a case this simple. We just use it to
	// look up the matching entry in our local array.
	/** @type {{ params: { slug: string } }} */
	let { params } = $props();

	let sketch = $derived(sketches.find((s) => s.slug === params.slug));
</script>
<h4>Dave is just testing: {params.slug} </h4>
{#if sketch}
	<a href="/gallery">← Back to Gallery</a>
	<h1>{sketch.title}</h1>
	<SketchCard {sketch} linked={false} />
{:else}
	<p>No sketch found for "{params.slug}".</p>
	<a href="/gallery">← Back to Gallery</a>
{/if}
