<script>
	// `data` is whatever load() returned in +page.server.js. There is no fetch,
	// no loading variable and no button here: the data is already in the page.
	let { data } = $props();
</script>

<h1>Load: the data is ready before the page appears</h1>

<p>
	No button on this page. Open the Network tab and reload: the browser makes no request to NASA
	at all, because the server already fetched the data in
	<code>src/routes/load/+page.server.js</code> and built it into the page.
</p>

<ul>
	{#each data.asteroids as neo (neo.id)}
		<li>
			<strong>{neo.name}</strong>
			— diameter: {neo.diameterKm} km — danger score: {neo.dangerScore}
			{#if neo.hazardous}<span class="hazard">potentially hazardous</span>{/if}
		</li>
	{/each}
</ul>

<p><a href="/naive">← Naive</a> · <a href="/proxied">The on-demand version →</a></p>

<style>
	.hazard {
		color: #b00020;
		font-size: 0.85em;
	}
</style>
