<script>
	let { data } = $props();
</script>

<!-- The public landing page: anyone can see it, logged in or not. -->
<h1>The Class Wall</h1>

{#if data.user}
	<p>Welcome back, {data.user.username}. <a href="/wall">Go to the wall</a>.</p>
	<!-- LAB 1 — step 6: if data.user.favouritePlant exists, show it here,
	     e.g. "Favourite plant: Monstera". -->
{:else}
	<p>A shared wall for the whole class. <a href="/register">Register</a> or <a href="/login">log in</a> to read and post.</p>
{/if}
