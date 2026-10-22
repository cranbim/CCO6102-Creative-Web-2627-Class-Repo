<!--
	+error.svelte — SvelteKit renders THIS instead of its own default
	error page whenever a load function throws (via the error() helper,
	or an unexpected exception). `page.status` and `page.error.message`
	come from what we passed to error() in +page.server.js.

	Try it: stop 15-express-sketch-api and reload /gallery. You should
	land here with a clear, specific message — not a blank, unstyled
	SvelteKit default page.
-->
<script>
	import { page } from '$app/state';
</script>

<!--
	Modern JS syntax note: `page.error?.message ?? 'Something went
	wrong.'` combines two operators —
	  ?.  optional chaining: if page.error is null/undefined, stop
	      there instead of throwing ("cannot read .message of null")
	  ??  nullish coalescing: if the left side is null/undefined,
	      use the right side instead
	Together: "show the error message if there is one, otherwise
	show a generic fallback".
-->
<main class="error-page">
	<h1>{page.status}</h1>
	<p>{page.error?.message ?? 'Something went wrong.'}</p>
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
