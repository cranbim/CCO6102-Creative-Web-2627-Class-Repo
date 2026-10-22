<script>
	import AsteroidSketch from '#lib/AsteroidSketch.svelte';

	// Random numbers standing in for real asteroids, so the sketch has something
	// to draw before we connect NASA's data. Size, colour and orbit all vary, but
	// nothing real is behind them yet.
	const placeholderAsteroids = [];
	for (let i = 0; i < 12; i++) {
		placeholderAsteroids.push({
			id: 'placeholder-' + i,
			name: 'Placeholder ' + i,
			diameterKm: Math.random() * 1.5,
			velocityKmH: Math.random() * 80000,
			missDistanceKm: Math.random() * 5000000,
			hazardous: Math.random() > 0.8,
			dangerScore: Math.random() * 100
		});
	}
</script>

<h1>Before: placeholder particles</h1>

<p>
	The sketch with random numbers standing in for real data. Compare it with
	<a href="/after">After</a>, which uses NASA's real asteroid feed.
</p>

<AsteroidSketch asteroids={placeholderAsteroids} />

<p><a href="/after">See it with real data →</a></p>
