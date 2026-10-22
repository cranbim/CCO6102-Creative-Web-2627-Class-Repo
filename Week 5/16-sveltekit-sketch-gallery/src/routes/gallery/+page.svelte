<script>
	// Modern JS syntax note: this is destructuring — pulling `sketches`
	// straight out of the `data` prop instead of writing `data.sketches`
	// everywhere below.
	let { data } = $props();

	// $state() makes these fields reactive — Svelte 5's runes syntax,
	// same pattern used since Week 1. Plain `let` here would NOT be
	// reactive.
	let title = $state('');
	let artist = $state('');
	let colorTag = $state('#5da9ff');
	let submitting = $state(false);
	let submitError = $state('');

	// A local, client-side copy of the list so a newly added sketch can
	// appear immediately without a full page reload — seeded once from
	// the server-loaded `data` prop. (We're deliberately using only
	// $state here, not $effect — $effect hasn't been covered yet, so
	// this stays within what's already been taught.)
	/** @type {Array<import('$lib/server/sketchApi.js').Sketch>} */
	let sketches = $state(data.sketches);

	/**
	 * Handles the "add a sketch" form. This is a PLAIN fetch() call to
	 * our OWN SvelteKit +server.js route (see src/routes/api/sketches/
	 * +server.js) — never straight to Express. SvelteKit then forwards
	 * it to Express server-to-server.
	 *
	 * Modern JS syntax note: this function is `async`, and uses `await`
	 * to pause until the fetch finishes — see the async/await supplement
	 * resources if this syntax is new to you.
	 * @param {SubmitEvent} event
	 */
	async function handleSubmit(event) {
		event.preventDefault();
		submitting = true;
		submitError = '';

		try {
			const res = await fetch('/api/sketches', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title, artist, colorTag })
			});

			if (!res.ok) {
				throw new Error(`Request failed with status ${res.status}`);
			}

			const newSketch = await res.json();
			// Modern JS syntax note: [...sketches, newSketch] is the spread
			// operator — it copies every existing item out of `sketches` into
			// a brand new array, then adds newSketch on the end. We do this
			// instead of sketches.push(newSketch) because Svelte's $state
			// reactivity notices a whole new array being assigned; mutating
			// the old one in place is easy to get wrong.
			sketches = [...sketches, newSketch];

			// reset the form
			title = '';
			artist = '';
			colorTag = '#5da9ff';
		} catch (err) {
			submitError = 'Could not add that sketch — is the Sketch API running?';
			console.error(err);
		} finally {
			submitting = false;
		}
	}

	// --- LAB EXERCISE --------------------------------------------------
	// toggleFavourite() is deliberately left unfinished. Right now it
	// just logs to the console instead of actually calling a PATCH
	// route. Your job in the lab:
	//   1. Build the PATCH route in src/routes/api/sketches/[id]/+server.js
	//      (there's a TODO there showing where to start)
	//   2. Add an updateSketch() helper to $lib/server/sketchApi.js
	//      (there's a TODO there too)
	//   3. Come back here and make this function actually fetch() that
	//      new route, the same way handleSubmit() above calls /api/sketches
	/**
	 * @param {import('$lib/server/sketchApi.js').Sketch} sketch
	 */
	function toggleFavourite(sketch) {
		console.log('TODO (lab): PATCH', sketch.id, '-> favourite:', !sketch.favourite);
		// TODO (lab): fetch(`/api/sketches/${sketch.id}`, { method: 'PATCH', ... })
		// then update `sketches` with the result, same pattern as handleSubmit().
	}
</script>

<main>
	<h1>Sketch Gallery</h1>
	<p><a href="/">← Home</a></p>

	<ul class="sketch-list">
		{#each sketches as sketch (sketch.id)}
			<li class="sketch-card" style="border-left-color: {sketch.colorTag}">
				<div>
					<strong>{sketch.title}</strong>
					<span class="artist">by {sketch.artist}</span>
				</div>
				<button
					class="fav-button"
					class:is-favourite={sketch.favourite}
					onclick={() => toggleFavourite(sketch)}
					title="Toggle favourite (lab: not wired up yet)"
				>
					{sketch.favourite ? '★' : '☆'}
				</button>
			</li>
		{/each}
	</ul>

	<h2>Add a sketch</h2>
	<form onsubmit={handleSubmit}>
		<label>
			Title
			<input type="text" bind:value={title} required />
		</label>
		<label>
			Artist
			<input type="text" bind:value={artist} required />
		</label>
		<label>
			Colour
			<input type="color" bind:value={colorTag} />
		</label>
		<button type="submit" disabled={submitting}>
			{submitting ? 'Adding…' : 'Add sketch'}
		</button>
		{#if submitError}
			<p class="error">{submitError}</p>
		{/if}
	</form>
</main>

<style>
	main {
		max-width: 36rem;
		margin: 2rem auto;
		padding: 0 1.5rem;
		font-family: system-ui, sans-serif;
	}
	.sketch-list {
		list-style: none;
		padding: 0;
	}
	.sketch-card {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-left: 6px solid #ccc;
		background: #f8f8f8;
		padding: 0.75rem 1rem;
		margin-bottom: 0.5rem;
		border-radius: 4px;
	}
	.artist {
		color: #666;
		margin-left: 0.5rem;
		font-size: 0.9rem;
	}
	.fav-button {
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		color: #ccc;
	}
	.fav-button.is-favourite {
		color: #f5a623;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		max-width: 20rem;
	}
	label {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		font-size: 0.9rem;
	}
	.error {
		color: #b91c1c;
	}
</style>
