<script>
	// ⚠️ TEACHING DEMO ONLY — this is the pattern we're about to show is a
	// bad idea. The API key below is baked directly into client-side code,
	// which means it ships inside the JS bundle sent to every visitor's
	// browser. Anyone can read it via view-source, or by opening dev tools
	// and watching the Network tab when the request fires.
	//
	// It's safe to use here because it's NASA's own public DEMO_KEY, not a
	// real personal key — but the PATTERN is exactly what you must never do
	// with a real one. That's the point of this page.
	const API_KEY = 'DEMO_KEY';

	// $state() makes these variables reactive — Svelte 5's runes syntax.
	// Any time we reassign them, anything referencing them in the markup
	// below updates automatically.
	/** @type {any[]} */
	let asteroids = $state([]);
	let loading = $state(false);
	let errorMessage = $state('');

	async function loadAsteroids() {
		loading = true;
		errorMessage = '';
		try {
			const today = new Date().toISOString().slice(0, 10);
			// Look closely at this URL once the request fires (Network tab) —
			// the api_key parameter is sitting right there in plain text.
			const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${API_KEY}`;

			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`NASA API responded with ${response.status}`);
			}
			const data = await response.json();
			console.log(data)
			asteroids = Object.values(data.near_earth_objects).flat();
		} catch (/** @type {any} */ err) {
			// NOTE FOR STEP 2b / TEACHING: if this fetch fails with a CORS
			// error rather than a normal HTTP error, that's an even more
			// vivid version of today's pain point — the browser refused to
			// even let us read the response. Check the actual browser
			// console, not just this message, to see which happened.
			errorMessage = err.message;
		} finally {
			loading = false;
		}
	}
</script>

<h1>Naive: fetching NeoWs directly from the client</h1>

<p>
	This page fetches NASA's near-Earth asteroid data straight from the browser, with the
	API key written directly into the client code above.
</p>

<ol>
	<li>Open your browser's dev tools and go to the <strong>Network</strong> tab.</li>
	<li>Click the button below.</li>
	<li>Find the request to <code>api.nasa.gov</code> and look at its URL.</li>
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

<p><a href="/load">See the fix — load/ →</a> · <a href="/proxied">or the on-demand version, proxied/ →</a></p>

<style>
	.error {
		color: #b00020;
	}
</style>
