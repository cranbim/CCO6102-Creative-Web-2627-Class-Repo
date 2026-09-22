<script>
	// ToggleDemo.svelte
	// Version 2 — same starting data as Version 1, but this time it's
	// $state, and each friend gets a button. Clicking it calls onToggle,
	// a plain function passed down to ToggleFriendCard as a prop.
	//
	// toggleFriend takes the friend object itself, not a name or an index
	// to look up — {#each} already gives each ToggleFriendCard a live
	// reference into the friends array, so mutating a property on that
	// reference (friend.online = ...) is enough to trigger reactivity.
	// Same object-mutation pattern taught elsewhere in this module.
	import ToggleFriendCard from './ToggleFriendCard.svelte';

	let friends = $state([
		{ name: 'Amara', online: true },
		{ name: 'Ben', online: false },
		{ name: 'Chloe', online: true },
		{ name: 'Dev', online: false }
	]);

	/** @param {{ name: string, online: boolean }} friend */
	function toggleFriend(friend) {
		friend.online = !friend.online;
	}
</script>

<section>
	<h2>Version 2 — with a toggle button</h2>
	<ul>
		{#each friends as friend}
			<ToggleFriendCard {friend} onToggle={toggleFriend} />
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
