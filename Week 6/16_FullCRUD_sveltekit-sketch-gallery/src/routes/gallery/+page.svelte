<script>
	// Destructuring — pulling `sketches` straight out of the `data`
	// prop instead of writing `data.sketches` everywhere below.
	let { data } = $props();

	// $state() makes these fields reactive — Svelte 5's runes syntax,
	// same pattern used since Week 1. Plain `let` here would NOT be
	// reactive.
	let title = $state('');
	let artist = $state('');
	let colorTag = $state('#5da9ff');
	let submitting = $state(false);
	let submitError = $state('');
	let listError = $state('');

	// A local, client-side copy of the list so a newly added sketch can
	// appear immediately without a full page reload — seeded once from
	// the server-loaded `data` prop. (We're deliberately using only
	// $state here, not $effect — $effect hasn't been covered yet, so
	// this stays within what's already been taught.)
	let sketches = $state(data.sketches);

	// Handles the "add a sketch" form. This is a PLAIN fetch() call to
	// our OWN SvelteKit +server.js route (see src/routes/api/sketches/
	// +server.js) — never straight to Express. SvelteKit then forwards
	// it to Express server-to-server.
	//
	// This function is `async`, and uses `await` to pause until the
	// fetch finishes — see the async/await supplement resources if
	// this syntax is new to you.
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
			// A plain push, not [...sketches, newSketch]. Svelte 5's
			// $state makes this array reactive even when we mutate it
			// directly, so the gallery list still re-renders — we don't
			// need to build a whole new array just to add one item.
			sketches.push(newSketch);

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

	// UPDATE — the favourite star. Same pattern as handleSubmit() above: a
	// plain fetch() to OUR OWN /api/sketches/:id route (src/routes/api/
	// sketches/[id]/+server.js), which forwards a PATCH to Express. We send
	// ONLY the field that changes: favourite, flipped.
	async function toggleFavourite(sketch) {
		listError = '';

		try {
			const res = await fetch(`/api/sketches/${sketch.id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ favourite: !sketch.favourite })
			});

			if (!res.ok) {
				throw new Error(`Request failed with status ${res.status}`);
			}

			// Express answers with the updated sketch. Copy its favourite
			// value onto the sketch in our local list and the star changes.
			// (Same direct-mutation idea as sketches.push() above.)
			const updated = await res.json();
			sketch.favourite = updated.favourite;
		} catch (err) {
			listError = 'Could not update that sketch — is the Sketch API running?';
			console.error(err);
		}
	}

	// DELETE — the ✕ button. A DELETE request has no body to send, and a
	// successful one gets no body back (status 204 No Content).
	async function deleteSketch(sketch) {
		listError = '';

		try {
			const res = await fetch(`/api/sketches/${sketch.id}`, {
				method: 'DELETE'
			});

			if (!res.ok) {
				throw new Error(`Request failed with status ${res.status}`);
			}

			// There is no body to read with res.json(). We just rebuild
			// our local list without that sketch: filter keeps every
			// sketch whose id is NOT the one we deleted.
			sketches = sketches.filter((s) => s.id !== sketch.id);
		} catch (err) {
			listError = 'Could not delete that sketch — is the Sketch API running?';
			console.error(err);
		}
	}
</script>

<main>
	<h1>Sketch Gallery</h1>
	<p><a href="/">← Home</a></p>

	{#if listError}
		<p class="error">{listError}</p>
	{/if}

	<ul class="sketch-list">
		{#each sketches as sketch (sketch.id)}
			<li class="sketch-card" style="border-left-color: {sketch.colorTag}">
				<div>
					<strong>{sketch.title}</strong>
					<span class="artist">by {sketch.artist}</span>
				</div>
				<div class="buttons">
					<button
						class="icon-button"
						class:is-favourite={sketch.favourite}
						onclick={() => toggleFavourite(sketch)}
						title="Toggle favourite"
					>
						{sketch.favourite ? '★' : '☆'}
					</button>
					<button
						class="icon-button delete"
						onclick={() => deleteSketch(sketch)}
						title="Delete this sketch"
					>
						✕
					</button>
				</div>
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

	<p class="note">
		These sketches live in the Express server's memory only. Stop and restart
		Express (<code>Ctrl-C</code>, then <code>npm run dev</code>) and reload this
		page: every add, star and delete is gone and the original four are back.
	</p>
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
	.buttons {
		display: flex;
		gap: 0.25rem;
	}
	.icon-button {
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		color: #ccc;
	}
	.icon-button.is-favourite {
		color: #f5a623;
	}
	.icon-button.delete:hover {
		color: #b91c1c;
	}
	.note {
		margin-top: 2rem;
		font-size: 0.85rem;
		color: #666;
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
