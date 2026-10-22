<script>
	/** @type {any[]} */
	let asteroids = $state([]);
	let loading = $state(false);
	let errorMessage = $state('');
	let days = $state(1);

	async function loadAsteroids() {
		loading = true;
		errorMessage = '';
		try {
			// TODO: once you've implemented the ?days= param in
			// src/routes/api/neo-lab/+server.js, this will start actually
			// changing what comes back.
			const response = await fetch(`/api/neo-lab?days=${days}`);
			if (!response.ok) {
				throw new Error(`Lab endpoint responded with ${response.status}`);
			}
			asteroids = await response.json();
		} catch (/** @type {any} */ err) {
			errorMessage = err.message;
		} finally {
			loading = false;
		}
	}
</script>

<h1>Lab: extend the proxy</h1>

<p>
	This page calls <code>/api/neo-lab</code> — see the TODO comments in
	<code>src/routes/api/neo-lab/+server.js</code> for the exercise.
</p>

<label>
	Days ahead:
	<input type="number" min="1" max="7" bind:value={days} />
</label>

<button onclick={loadAsteroids} disabled={loading}>
	{loading ? 'Fetching…' : 'Fetch asteroids'}
</button>

{#if errorMessage}
	<p class="error">Error: {errorMessage}</p>
{/if}

<ul>
	{#each asteroids as neo (neo.id)}
		<li>{neo.name} — danger score: {neo.dangerScore}</li>
	{/each}
</ul>

<p><a href="/proxied">← Back to the proxied version</a></p>

<style>
	.error {
		color: #b00020;
	}
</style>
