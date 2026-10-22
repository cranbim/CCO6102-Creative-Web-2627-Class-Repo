<script>
	import AsteroidSketch from '#lib/AsteroidSketch.svelte';

	// Placeholder data — random numbers standing in for real asteroids, so
	// the sketch renders something before we wire up live data in after/.
	// Notice size/colour/orbit still vary, but there's no real "danger"
	// behind any of it yet.
	const placeholderAsteroids = Array.from({ length: 12 }, (_, i) => ({
		id: `placeholder-${i}`,
		name: `Placeholder ${i}`,
		diameterKm: Math.random() * 1.5,
		velocityKmH: Math.random() * 80000,
		missDistanceKm: Math.random() * 5000000,
		hazardous: Math.random() > 0.8,
		dangerScore: Math.random() * 100
	}));
</script>

<h1>Before: placeholder particles</h1>

<p>
	This sketch renders the same visual mapping we'll use for real data — but with random
	numbers standing in. Compare this to <a href="/after">after</a>, once it's driven by
	NASA's actual near-Earth asteroid feed via our own <code>/api/neo</code> proxy.
</p>

<AsteroidSketch asteroids={placeholderAsteroids} />

<p><a href="/after">See it driven by real data →</a></p>
