<script>
	import { onMount } from 'svelte';
	import LabSketch from '#lib/LabSketch.svelte';

	// This page uses the OTHER pattern from After: the browser fetches from our
	// API route, /api/neo, when the page appears. onMount runs once, in the
	// browser, so the fetch happens there.
	let asteroids = $state([]);
	let loading = $state(true);
	let errorMessage = $state('');

	async function loadAsteroids() {
		try {
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

	onMount(loadAsteroids);
</script>

<h1>Lab: draw the hazardous asteroids differently</h1>

<p>
	Open <code>src/lib/LabSketch.svelte</code> and follow the LAB comments. Every asteroid has a
	<code>hazardous</code> flag that nothing draws yet.
</p>

{#if loading}
	<p>Loading asteroid data…</p>
{:else if errorMessage}
	<p class="error">Error: {errorMessage}</p>
{:else}
	<LabSketch asteroids={asteroids} />
{/if}

<p><a href="/after">← Back to the finished version</a></p>

<style>
	.error {
		color: #b00020;
	}
</style>
