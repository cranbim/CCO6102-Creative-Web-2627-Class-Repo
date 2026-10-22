<script>
	import SketchCard from '#lib/SketchCard.svelte';
	import { sketches } from '#lib/sketches.js';

	// Just picking the first entry to feature — no fetch, no load, just
	// plain JS on an imported array.
	const featured = sketches[0];
</script>

<h1>Dave is talking about Sveltekit</h1>

<p>
	This is a small multi-page site with no external data at all — everything on every page
	comes from <code>src/lib/sketches.js</code>, a plain local array. The point of this demo is
	the <strong>routing and sharing mechanism itself</strong>: multiple pages, one shared layout,
	shared components, and a dynamic route parameter — before we bring an external API into the
	picture at all.
</p>

<p>Try the nav above: <code>/</code>, <code>/about</code>, and <code>/gallery</code> are three separate route folders under <code>src/routes</code>.</p>

<h2>Featured sketch</h2>
<p>This card is the exact same <code>SketchCard.svelte</code> component used on the Gallery page — imported once from <code>#lib</code>, reused wherever it's needed.</p>

<SketchCard sketch={featured} />
