<script>
	// App.svelte
	// Both versions run independently — separate components, separate data,
	// separate state. Nothing here connects them; they just happen to sit
	// on the same page for comparison. Same "run two versions side by side"
	// shape as other weeks' before/after demos.
	import StaticDemo from './StaticDemo.svelte';
	import ToggleDemo from './ToggleDemo.svelte';
	import LabList from './LabList.svelte';
</script>

<main>
	<h1>{'{#each}'} and {'{#if}'}</h1>
	<p class="intro">
		Same friends list, two ways. Compare <code>FriendCard.svelte</code>
		against <code>ToggleFriendCard.svelte</code> — that's the whole diff.
	</p>

	<div class="demos">
		<StaticDemo />
		<ToggleDemo />
		<LabList />
	</div>
</main>

<style>
	main {
		max-width: 420px;
		margin: 2rem auto;
		font-family: system-ui, sans-serif;
	}

	.intro {
		color: #555;
		font-size: 0.9rem;
	}

	.demos {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
</style>
