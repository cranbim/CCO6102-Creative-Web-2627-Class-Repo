<script>
	// Exercise2_Progress.svelte — EXERCISE 2: CORE PRACTICE
	//
	// Given: a $state array of books (this time with page counts), and
	// logPages(book, amount) — a function that adds pages to a book's
	// running total, the same object-mutation pattern from the shared
	// state work (mutate a property; {#each} already hands each
	// ProgressCard a live reference into the array, so this is enough).
	//
	// TODO 1: write an {#each} block below, looping over `books` and
	// rendering one <ProgressCard> per book. Pass two props:
	//   - book        → the book object for this iteration
	//   - onLogPages  → logPages (the function above)
	//
	// The rest of this exercise (the derived percentage, the input, the
	// "finished" message) all lives in ProgressCard.svelte — that's
	// TODOs 2, 3 and 4.
	import ProgressCard from './ProgressCard.svelte';

	let books = $state([
		{ title: 'The Hobbit', pagesRead: 310, totalPages: 310 },
		{ title: 'Dune', pagesRead: 40, totalPages: 412 },
		{ title: 'Piranesi', pagesRead: 90, totalPages: 245 }
	]);

	/**
	 * @param {{ title: string, pagesRead: number, totalPages: number }} book
	 * @param {number} amount
	 */
	function logPages(book, amount) {
		book.pagesRead = Math.min(book.pagesRead + amount, book.totalPages);
	}
</script>

<section>
	<h3>Exercise 2 — Core practice: log your pages</h3>
	<p class="task">
		Write the <code>{'{#each}'}</code> below, then open
		<code>ProgressCard.svelte</code> for the rest — three TODOs there,
		covering <code>$derived</code>, <code>bind:value</code>, and
		<code>{'{#if}'}</code>.
	</p>
	<ul>
		<!-- TODO 1: your {#each} block goes here -->
	</ul>
</section>

<style>
	ul {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.task {
		background: #eef6ff;
		border: 1px solid #cfe3fb;
		border-radius: 6px;
		padding: 0.75rem;
		font-size: 0.9rem;
	}
</style>
