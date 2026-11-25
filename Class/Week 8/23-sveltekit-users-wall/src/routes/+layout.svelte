<script>
	import favicon from '#lib/assets/favicon.svg';

	// data.user comes from +layout.server.js — the REAL answer from the server.
	let { data, children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Class Wall</title>
</svelte:head>

<nav>
	<a href="/">Home</a>
	<a href="/pretend">Pretend login</a>

	{#if data.user}
		<a href="/wall">Wall</a>
		<a href="/my-posts">My posts</a>
		<span class="who">Logged in as <strong>{data.user.username}</strong></span>

		<!-- Logging out CHANGES something (the token is crossed off), so it is a
		     form POST, not a link. It posts to the action in /logout. -->
		<form method="POST" action="/logout">
			<button>Log out</button>
		</form>
	{:else}
		<a href="/login">Log in</a>
		<a href="/register">Register</a>
	{/if}
</nav>

<main>
	{@render children()}
</main>

<style>
	:global(body) {
		font-family: system-ui, sans-serif;
		margin: 0;
		background: #f6f7f4;
		color: #1d2a1f;
	}
	nav {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		align-items: center;
		padding: 0.8rem 1.2rem;
		background: #2f5d3a;
		color: white;
	}
	nav a {
		color: white;
	}
	.who {
		margin-left: auto;
	}
	nav form {
		margin: 0;
	}
	main {
		max-width: 40rem;
		margin: 2rem auto;
		padding: 0 1rem;
	}
	:global(.error) {
		color: #a4161a;
		font-weight: bold;
	}
	:global(label) {
		display: block;
		margin: 0.6rem 0;
	}
</style>
