<script>
	// A layout receives the page it wraps as "children". The line below picks
	// `children` out of the props SvelteKit gives us (the same { } pattern you
	// know from React props). {@render children()} then draws the page.
	let { children } = $props();
</script>

<nav>
	<a href="/">Home</a>
	<a href="/naive">1. Naive</a>
	<a href="/load">2. Load</a>
	<a href="/proxied">3. Proxied</a>
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
