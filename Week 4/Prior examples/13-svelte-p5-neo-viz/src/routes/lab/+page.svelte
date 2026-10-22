<script>
	import LabSketch from '#lib/LabSketch.svelte';

	// This page deliberately uses the OTHER pattern from after/ — manual
	// fetch() to a +server.js endpoint, not a load function — so you get
	// practice with both. See src/routes/after/+page.server.js for the
	// load version of the same data.
	/** @type {any[]} */
	let asteroids = $state([]);
	let loading = $state(true);
	let errorMessage = $state('');

	async function loadAsteroids() {
		loading = true;
		errorMessage = '';
		try {
			const response = await fetch('/api/neo');
			if (!response.ok) {
				throw new Error(`Proxy responded with ${response.status}`);
			}
			asteroids = await response.json();
		} catch (/** @type {any} */ err) {
			errorMessage = err.message;
		} finally {
			loading = false;
		}
	}

	loadAsteroids();
</script>

<h1>Lab: map an additional field</h1>

<p>
	See the TODO comments in <code>src/lib/LabSketch.svelte</code> — every asteroid also
	carries a <code>hazardous</code> flag that isn't mapped to anything visual yet.
</p>

{#if loading}
	<p>Loading asteroid data…</p>
{:else if errorMessage}
	<p class="error">Error: {errorMessage}</p>
{:else}
	<LabSketch {asteroids} />
{/if}

<p><a href="/after">← Back to the finished version</a></p>

<style>
	.error {
		color: #b00020;
	}
</style>
