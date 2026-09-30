<script>
	// BookRow.svelte
	// This file is finished — nothing to change here. Read it if you like,
	// but Exercise 1 only asks you to write one thing, and it's in
	// Exercise1_Shelf.svelte, not this file.
	let { book } = $props();
</script>

<li>
	<span class="title">{book.title}</span>
	<span class="author">by {book.author}</span>
	{#if book.finished}
		<span class="badge done">✅ Finished</span>
	{:else}
		<span class="badge reading">📖 Reading</span>
	{/if}
</li>

<style>
	li {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.4rem 0;
		border-bottom: 1px solid #eee;
	}

	.title {
		font-weight: bold;
	}

	.author {
		color: #666;
		font-size: 0.9rem;
	}

	.badge {
		margin-left: auto;
		font-size: 0.85rem;
	}
</style>
