<script>
	// Exercise1_Shelf.svelte — EXERCISE 1: WARM-UP
	//
	// Everything here already works except one line. The data is given,
	// the child component (BookRow.svelte) is finished and already
	// handles the {#if} badge for you. This exercise is only about
	// {#each} — nothing else.
	import BookRow from './BookRow.svelte';

	const books = [
		{ title: 'The Hobbit', author: 'J.R.R. Tolkien', finished: true },
		{ title: 'Dune', author: 'Frank Herbert', finished: false },
		{ title: 'Piranesi', author: 'Susanna Clarke', finished: true },
		{ title: 'Circe', author: 'Madeline Miller', finished: false }
	];
</script>

<section>
	<h3>Exercise 1 — Warm-up: show your shelf</h3>
	<p class="task">
		<strong>Your only task:</strong> below, replace the single line
		<code>&lt;!-- YOUR TURN: one line goes here --&gt;</code> with an
		<code>{'{#each}'}</code> block that loops over <code>books</code> and
		renders one <code>&lt;BookRow /&gt;</code> per book, passing the
		book as a prop. If you get stuck, look at how any of the earlier
		demos wire up an <code>{'{#each}'}</code> loop — the shape is
		identical every time.
	</p>

	<ul>
		<!-- YOUR TURN: one line goes here -->
	</ul>
</section>

<style>
	ul {
		list-style: none;
		padding: 0;
	}

	.task {
		background: #eef6ff;
		border: 1px solid #cfe3fb;
		border-radius: 6px;
		padding: 0.75rem;
		font-size: 0.9rem;
	}
</style>
