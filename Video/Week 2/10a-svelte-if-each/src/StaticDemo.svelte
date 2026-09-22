<script>
	// StaticDemo.svelte
	// Version 1 — no interactivity. The data lives right here as a plain
	// array of plain objects. No import, no fetch, nothing reactive.
	// {#each} just needs something to loop over.
	import FriendCard from './FriendCard.svelte';

	const friends = [
		{ name: 'Amara', online: false },
		{ name: 'Ben', online: false },
		{ name: 'Chloe', online: true },
		{ name: 'Dev', online: false }
	];
</script>

<section>
	<h2>Version 1 — static</h2>
	<ul>
		{#each friends as friend}
			<FriendCard {friend} />
		{/each}
	</ul>
</section>

<style>
	h2 {
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
	}

	ul {
		list-style: none;
		padding: 0;
	}
</style>
