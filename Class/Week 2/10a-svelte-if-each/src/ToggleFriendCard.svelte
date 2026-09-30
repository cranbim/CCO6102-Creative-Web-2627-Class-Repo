<script>
	// ToggleFriendCard.svelte
	// Version 2 — same {#if}/{:else} as FriendCard.svelte, but this one also
	// receives a function via props: onToggle. The button doesn't change
	// `friend.online` itself — it can't, this component doesn't own that
	// data. It just calls the function its parent gave it, and trusts the
	// parent to handle the actual change. Same "pass a callback down as a
	// prop" pattern used elsewhere in the module.
	let { friend, onToggle } = $props();
</script>

<li>
	{#if friend.online}
		🟢 {friend.name} — online
	{:else}
		⚪ {friend.name} — offline
	{/if}
	<button onclick={() => onToggle(friend)}>Toggle</button>
</li>

<style>
	li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem 0;
		border-bottom: 1px solid #eee;
	}

	button {
		font-size: 0.85rem;
	}
</style>
