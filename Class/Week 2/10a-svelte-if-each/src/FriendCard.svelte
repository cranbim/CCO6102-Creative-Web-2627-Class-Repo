<script>
	// FriendCard.svelte
	// Receives one friend's data via props. The {#if} below is the whole
	// point of this file — it picks which markup to show based on a plain
	// property (friend.online), nothing more.
	let { friend } = $props();
</script>

<li>
	{#if friend.online}
		🟢 {friend.name} — online
	{:else}
		⚪ {friend.name} — offline
	{/if}
</li>

<style>
	li {
		padding: 0.5rem 0;
		border-bottom: 1px solid #eee;
		list-style: none;
	}
</style>
