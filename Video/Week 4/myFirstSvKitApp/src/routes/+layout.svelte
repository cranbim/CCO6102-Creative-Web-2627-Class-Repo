<script>
	import favicon from '#lib/assets/favicon.svg';

	/** @type {{children: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<h1>Welcome to the first SK site</h1>
<nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
</nav>

{@render children()}

<footer>
	<p>Site by Dave</p>
</footer>
