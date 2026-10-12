<script>
	// ProgressCard.svelte
	// Props arrive the same way as in earlier labs — that part's given.
	let { book, onLogPages } = $props();

	// TODO 2: replace the line below with a $derived value that computes
	// the percentage of pages read, rounded to a whole number:
	//   Math.round((book.pagesRead / book.totalPages) * 100)
	let percent = 0;

	// Given, not part of the exercise — just an ordinary $state value to
	// hold whatever number the reader types in before clicking "Log".
	let amount = $state(10);
</script>

<div class="card">
	<h4>{book.title}</h4>

	<!--
		TODO 4: wrap the <p> and the progress bar <div> below in
		{#if book.pagesRead >= book.totalPages} ... {:else} ... {/if},
		so a "🎉 Finished!" message shows instead once every page is read.
	-->
	<p>{book.pagesRead} / {book.totalPages} pages ({percent}%)</p>
	<div class="bar"><div class="fill" style="width: {percent}%"></div></div>

	<!--
		TODO 3: add a number input here, bound to `amount` with
		bind:value, and a button that calls onLogPages(book, amount)
		when clicked. Look at ToggleFriendCard.svelte (Week 2) for how a
		button calls a function passed down as a prop.
	-->
</div>

<style>
	.card {
		border: 1px solid #ddd;
		border-radius: 8px;
		padding: 0.75rem 1rem;
	}

	h4 {
		margin: 0 0 0.4rem 0;
	}

	.bar {
		background: #eee;
		border-radius: 999px;
		height: 8px;
		overflow: hidden;
		margin-top: 0.4rem;
	}

	.fill {
		background: #4caf50;
		height: 100%;
	}
</style>
