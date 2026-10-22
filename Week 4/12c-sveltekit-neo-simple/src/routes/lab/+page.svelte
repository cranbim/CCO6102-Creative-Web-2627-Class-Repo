<script>
	let asteroids = $state([]);
	let days = $state(1);
	let status = $state('');

	async function loadAsteroids() {
		status = 'Fetching…';
		asteroids = [];

		const response = await fetch('/api/neo-lab?days=' + days);

		if (response.ok) {
			asteroids = await response.json();
			status = response.status + ' OK: ' + asteroids.length + ' asteroids';
		} else {
			// Show the status code, like the Lab page in demo 12b.
			status = 'Error ' + response.status;
		}
	}
</script>

<h1>Lab: let the API route take a number of days</h1>

<p>
	This page calls <code>/api/neo-lab?days=…</code>. Follow the instructions in
	<code>src/routes/api/neo-lab/+server.js</code> to make it work. Try 3, then try 0 and 9, and
	watch the status code.
</p>

<label>
	Days:
	<input type="number" bind:value={days} />
</label>

<button onclick={loadAsteroids}>Fetch asteroids</button>

<p><strong>{status}</strong></p>

<ul>
	{#each asteroids as neo (neo.id)}
		<li>{neo.name} — danger score: {neo.dangerScore}</li>
	{/each}
</ul>

<p><a href="/proxied">← Back to proxied</a></p>
