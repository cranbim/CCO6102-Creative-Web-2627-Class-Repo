<script>
	// PageProps gives us `data` typed from what load() returned. No
	// fetch(), no $state for loading/error, no button. Compare this
	// entire file to src/routes/proxied/+page.svelte.
	/** @type {{ data: { asteroids: any[] } }} */
	let { data } = $props();
	console.log(data)
</script>

<h1>Load: data ready before the page even renders</h1>

<p>
	No button on this page — open dev tools' Network tab and reload. You'll see the request to
	NASA happen, but notice there's no separate client-side fetch to <code>/api/neo</code> or
	anything else: the data arrived as part of this page's own request/response, via
	<code>src/routes/load/+page.server.js</code>.
</p>

<p>
	This is the SAME underlying data (same danger score, same hidden formula) as
	<a href="/proxied">/proxied</a> — the difference is entirely in HOW it gets here, not
	in what's hidden or why.
</p>

<ul>
	{#each data.asteroids as neo (neo.id)}
		<li>
			<strong>{neo.name}</strong>
			— diameter: {neo.diameterKm} km
			— danger score: {neo.dangerScore}
			{#if neo.hazardous}<span class="hazard">⚠ potentially hazardous</span>{/if}
		</li>
	{/each}
</ul>

<p>
	<a href="/naive">← Naive (the pain demo)</a> ·
	<a href="/proxied">Compare: the +server.js / on-demand version →</a>
</p>

<style>
	.hazard {
		color: #b00020;
		font-size: 0.85em;
	}
</style>
