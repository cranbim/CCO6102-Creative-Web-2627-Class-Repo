<script>
	/** @type {any[]} */
	let asteroids = $state([]);
	let loading = $state(false);
	let errorMessage = $state('');

	async function loadAsteroids() {
		loading = true;
		errorMessage = '';
		try {
			// Compare this to the naive/ page: no API key anywhere here.
			// We're calling OUR OWN route — src/routes/api/neo/+server.js —
			// which holds the real key on the server and never sends it
			// to the browser.
			const response = await fetch('/api/neo');
			if (!response.ok) {
				throw new Error(`Our proxy responded with ${response.status}`);
			}
			asteroids = await response.json();
		} catch (/** @type {any} */ err) {
			errorMessage = err.message;
		} finally {
			loading = false;
		}
	}
</script>

<h1>Proxied: an on-demand +server.js endpoint</h1>

<p>
	Compare this to <a href="/load">/load</a>: that page's data was ready automatically, before
	the page even rendered. This page is different on purpose — nothing happens until you click
	the button below. That's the whole point of <code>+server.js</code>: it's for data the
	<strong>client chooses when to ask for</strong>, not data that should just be there.
</p>

<p>
	Open dev tools → Network tab and click the button. The request goes to <code>/api/neo</code>
	— our own server. No API key appears anywhere in the browser, same as <code>/load</code>.
</p>

<p>
	Notice each asteroid also has a <strong>danger score</strong> — a number computed on the
	server from raw NASA data. The formula that produces it lives only in
	<code>src/lib/server/neo.js</code>, which SvelteKit guarantees can never be bundled into
	client code. We're hiding logic here, not just a key — and it's the exact same shared
	helper function that <code>/load</code> uses too.
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
			— diameter: {neo.diameterKm} km
			— danger score: {neo.dangerScore}
			{#if neo.hazardous}<span class="hazard">⚠ potentially hazardous</span>{/if}
		</li>
	{/each}
</ul>

<p><a href="/naive">← Back to the naive version</a> · <a href="/lab">Go to the lab →</a></p>

<style>
	.error {
		color: #b00020;
	}
	.hazard {
		color: #b00020;
		font-size: 0.85em;
	}
</style>
