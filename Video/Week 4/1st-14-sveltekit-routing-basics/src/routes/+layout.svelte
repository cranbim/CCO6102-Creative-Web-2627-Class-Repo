<script>
	// Every page in this app renders inside this layout — the nav below
	// is written once here, not repeated in every +page.svelte.
	let { children } = $props();
</script>

<nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/gallery">Gallery</a>
	<a href="/test">Test</a>
	<!-- LAB: once you've built the /favourites page (see README), add
	     its nav link here too — <a href="/favourites">Favourites</a> -->
</nav>

<main>
	{@render children()}
</main>

<footer>
	<p>Page by Dave</p>
</footer>

<style>
	nav {
		display: flex;
		gap: 1rem;
		padding: 1rem;
		border-bottom: 1px solid #ddd;
		font-family: system-ui, sans-serif;
	}
	nav a {
		text-decoration: none;
		color: #2e5395;
		font-weight: 600;
	}
	main {
		max-width: 760px;
		margin: 0 auto;
		padding: 1.5rem;
		font-family: system-ui, sans-serif;
		line-height: 1.5;
	}
	:global(code) {
		background: #f0f0f0;
		padding: 0.1em 0.3em;
		border-radius: 3px;
	}
</style>
