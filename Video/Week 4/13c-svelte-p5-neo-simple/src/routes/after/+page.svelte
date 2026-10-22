<script>
	import AsteroidSketch from '#lib/AsteroidSketch.svelte';

	// `data` is what load() returned in +page.server.js. No fetch, no loading
	// variable: the asteroids are already here when the page appears.
	let { data } = $props();
</script>

<h1>After: today's real asteroids</h1>

<p>
	Each particle is a near-Earth asteroid. Size = diameter. Colour = the danger score from the
	server, green to red. Orbit radius = miss distance. Orbit speed = velocity.
</p>

<p>
	There is no loading state because the data came from a <code>load</code> function
	(<code>src/routes/after/+page.server.js</code>), not a <code>fetch()</code> in the page.
	The <a href="/lab">Lab</a> page does it the other way round.
</p>

<AsteroidSketch asteroids={data.asteroids} />
<p>{data.asteroids.length} asteroids today.</p>

<p><a href="/before">← Before</a> · <a href="/lab">Go to the lab →</a></p>
