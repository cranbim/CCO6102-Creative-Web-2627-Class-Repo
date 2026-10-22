<script>
	let asteroids = $state([]);
	let loading = $state(false);
	let errorMessage = $state('');

	async function loadAsteroids() {
		loading = true;
		errorMessage = '';
		try {
			// No API key anywhere on this page. We call OUR OWN route,
			// src/routes/api/neo/+server.js. It holds the key on the server and
			// calls NASA for us.
			const response = await fetch('/api/neo');
			if (!response.ok) {
				throw new Error('Our API responded with status ' + response.status);
			}
			asteroids = await response.json();
		} catch (err) {
			errorMessage = err.message;
		} finally {
			loading = false;
		}
	}
</script>

<h1>Proxied: an API route we fetch when we choose</h1>

<p>
	Compare this with <a href="/load">/load</a>. There the data was ready automatically. Here
	nothing happens until you click, because this data is for the <strong>browser to ask for
	when it wants it</strong>: a button, a search box, a refresh.
</p>

<p>
	Open the Network tab and click. The request goes to <code>/api/neo</code>, our own server, and
	no API key appears in the browser. The danger score is calculated on the server too, in
	<code>src/lib/server/neo.js</code>, so the formula stays hidden as well as the key.
</p>

<button onclick={loadAsteroids} disabled={loading}>
	{loading ? 'Fetching…' : 'Fetch asteroids'}
</button>

{#if errorMessage}
	<p class="error">Error: {errorMessage}</p>
{/if}

<ul>
	{#each asteroids as neo (neo.id)}
		<li>
			<strong>{neo.name}</strong>
			— diameter: {neo.diameterKm} km — danger score: {neo.dangerScore}
			{#if neo.hazardous}<span class="hazard">potentially hazardous</span>{/if}
		</li>
	{/each}
</ul>

<p><a href="/load">← Load</a> · <a href="/lab">Go to the lab →</a></p>

<style>
	.error {
		color: #b00020;
	}
	.hazard {
		color: #b00020;
		font-size: 0.85em;
	}
</style>
