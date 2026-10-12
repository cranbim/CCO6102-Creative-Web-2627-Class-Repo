<script>
	// Every page renders inside this layout, so the nav is written once.
	let { children } = $props();
</script>

<nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/ideas">Ideas</a>
	<a href="/lab">Lab</a>
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
	:global(code, pre) {
		background: #f0f0f0;
		padding: 0.1em 0.3em;
		border-radius: 3px;
	}
	:global(pre) {
		padding: 0.75rem;
		overflow-x: auto;
	}
</style>
