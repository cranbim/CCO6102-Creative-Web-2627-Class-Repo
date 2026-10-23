<!--
	+page.svelte for "/" — just a signpost. Nothing new here.
-->
<main>
	<h1>Sketch Gallery — data kept in a module</h1>
	<p>
		One SvelteKit app. The sketch data lives in
		<code>src/lib/server/sketchData.js</code> and can only be changed by calling its
		functions: create, read, update, delete. Demo 15 moves that data into a separate
		Express server.
	</p>
	<p><a href="/gallery">→ View the Sketch Gallery</a></p>
	<p><a href="/api/sketches">→ See the raw JSON at /api/sketches</a></p>
</main>

<style>
	main {
		max-width: 36rem;
		margin: 2rem auto;
		padding: 0 1.5rem;
		font-family: system-ui, sans-serif;
	}
</style>
