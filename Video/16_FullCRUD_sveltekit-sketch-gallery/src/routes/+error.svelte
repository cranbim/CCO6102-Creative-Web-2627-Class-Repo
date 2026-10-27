<!--
	+error.svelte — SvelteKit renders THIS instead of its own default
	error page whenever a load function throws (via the error() helper,
	or an unexpected exception). `page.status` and `page.error.message`
	come from what we passed to error() in +page.server.js.

	Try it: stop 15_FullCRUD_express-sketch-api and reload /gallery. You should
	land here with a clear, specific message — not a blank, unstyled
	SvelteKit default page.
-->
<script>
	import { page } from '$app/state';

	// $derived recomputes this whenever `page` changes — same rune
	// used since Week 3. page.error is only ever missing in the rare
	// case SvelteKit itself couldn't figure out what went wrong (not
	// our situation here — our own +page.server.js always sets a
	// message), but we check for it explicitly rather than assuming,
	// so this page never crashes trying to read .message off nothing.
	let errorMessage = $derived(page.error ? page.error.message : 'Something went wrong.');
</script>

<main class="error-page">
	<h1>{page.status}</h1>
	<p>{errorMessage}</p>
	<p class="hint">
		<a href="/">← Back to home</a>
	</p>
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
