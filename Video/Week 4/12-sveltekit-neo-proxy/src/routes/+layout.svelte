<script>
	// $props() with destructuring is Svelte 5's replacement for Svelte 4's
	// `export let children` — this is how a layout receives the page
	// content it wraps.
	let { children } = $props();
</script>

<nav>
	<a href="/">Home</a>
	<a href="/naive">1. Naive (exposed key)</a>
	<a href="/load">2. Load (idiomatic fix)</a>
	<a href="/proxied">3. Proxied (on-demand contrast)</a>
	<a href="/lab">4. Lab</a>
</nav>

<main>
	{@render children()}
</main>

<style>
	nav {
		display: flex;
		gap: 1rem;
		padding: 1rem;
		border-bottom: 1px solid #ddd;
		font-family: system-ui, sans-serif;
	}
	main {
		max-width: 640px;
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
