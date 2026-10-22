<script>
	// WARNING: this page shows what NOT to do.
	// The key is written straight into code that runs in the browser, so every
	// visitor receives it. (This is NASA's public DEMO_KEY, so it is safe to show
	// here. A personal key must never go in client code.)
	const apiKey = 'DEMO_KEY';

	// $state makes a variable reactive: when it changes, the page updates.
	let asteroids = $state([]);
	let loading = $state(false);
	let errorMessage = $state('');

	async function loadAsteroids() {
		loading = true;
		errorMessage = '';
		try {
			const today = new Date().toISOString().slice(0, 10); // e.g. 2026-10-21

			// Look at this URL in the Network tab after you click: the api_key
			// is sitting there in plain text.
			const url =
				'https://api.nasa.gov/neo/rest/v1/feed' +
				'?start_date=' + today +
				'&end_date=' + today +
				'&api_key=' + apiKey;

			const response = await fetch(url);
			if (!response.ok) {
				throw new Error('NASA responded with status ' + response.status);
			}
			const data = await response.json();

			// NASA groups asteroids by date. We asked for one day, so we take
			// that day's list (or an empty list if there is none).
			asteroids = data.near_earth_objects[today] || [];
		} catch (err) {
			errorMessage = err.message;
		} finally {
			loading = false;
		}
	}
</script>

<h1>Naive: fetching NASA straight from the browser</h1>

<p>This page calls NASA directly, with the API key written into the code above.</p>

<ol>
	<li>Open your browser's dev tools and choose the <strong>Network</strong> tab.</li>
	<li>Click the button below.</li>
	<li>Find the request to <code>api.nasa.gov</code> and read its URL.</li>
</ol>

<button onclick={loadAsteroids} disabled={loading}>
	{loading ? 'Fetching…' : 'Fetch asteroids'}
</button>

{#if errorMessage}
	<p class="error">Error: {errorMessage}</p>
{/if}

<ul>
	{#each asteroids as neo (neo.id)}
		<li>{neo.name}</li>
	{/each}
</ul>

<p><a href="/load">See the fix: load →</a></p>

<style>
	.error {
		color: #b00020;
	}
</style>
