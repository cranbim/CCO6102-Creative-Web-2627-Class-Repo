<script>
	import { pretendLogin } from '#lib/pretendLogin.svelte.js';

	let { children } = $props();

	// Flip the pretend switch. Only the browser's memory changes —
	// the server never hears about it.
	function toggle() {
		pretendLogin.loggedIn = !pretendLogin.loggedIn;
	}
</script>

<div class="pretend-bar">
	<strong>PRETEND LOGIN</strong>
	<a href="/pretend">Pretend home</a>

	<!-- The nav only SHOWS the secret link when the switch is on... -->
	{#if pretendLogin.loggedIn}
		<a href="/pretend/secret">Secret page</a>
	{/if}

	<button onclick={toggle}>
		{#if pretendLogin.loggedIn}Pretend log out{:else}Pretend log in{/if}
	</button>
</div>

{@render children()}

<style>
	.pretend-bar {
		display: flex;
		gap: 1rem;
		align-items: center;
		padding: 0.6rem 1rem;
		margin-bottom: 1.5rem;
		background: #ffe8a3;
		border: 2px dashed #b08900;
	}
</style>
