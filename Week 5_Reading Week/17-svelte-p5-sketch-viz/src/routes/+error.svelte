<script>
	import { page } from '$app/state';

	// $derived recomputes this whenever `page` changes — same rune
	// used since Week 3. page.error is checked explicitly rather than
	// assumed present, so this page never crashes trying to read
	// .message off nothing.
	let errorMessage = $derived(page.error ? page.error.message : 'Something went wrong.');
</script>

<main class="error-page">
	<h1>{page.status}</h1>
	<p>{errorMessage}</p>
	<p class="hint"><a href="/">← Back to home</a></p>
</main>

<style>
	.error-page {
		max-width: 32rem;
		margin: 4rem auto;
		padding: 0 1.5rem;
		font-family: system-ui, sans-serif;
		text-align: center;
	}
	h1 {
		font-size: 3rem;
		margin-bottom: 0.5rem;
		color: #b91c1c;
	}
	.hint {
		margin-top: 2rem;
	}
</style>
