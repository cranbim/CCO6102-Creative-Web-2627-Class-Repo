<script>
	import AsteroidSketch from '#lib/AsteroidSketch.svelte';

	// Compare this to lab/+page.svelte: no fetch(), no $state for
	// loading/error, no onMount. The data prop is populated by
	// +page.server.js's load function before this component ever renders
	// — see that file for why `load` (not +server.js) is the right choice
	// here.
	/** @type {{ data: { asteroids: any[] } }} */
	let { data } = $props();
</script>

<h1>After: driven by live NeoWs data (via load)</h1>

<p>
	Each particle is one of today's near-Earth asteroids: size = diameter, colour = the
	server-computed danger score (green → red), orbit radius = miss distance, orbit speed =
	relative velocity.
</p>

<p>
	Notice there's no loading state on this page — the data was ready before the page rendered,
	because it was fetched by a <code>load</code> function
	(<code>src/routes/after/+page.server.js</code>), not by a client-side <code>fetch()</code>
	call. Compare this to <a href="/lab">/lab</a>, which deliberately does it the other way.
</p>

<AsteroidSketch asteroids={data.asteroids} />
<p>{data.asteroids.length} asteroids today.</p>

<p><a href="/before">← Back to placeholder version</a> · <a href="/lab">Go to the lab →</a></p>
