<script>
	// Pull `sketches` out of the data that +page.server.js's load() returned.
	// Same `let { data } = $props()` as demo 12c.
	let { data } = $props();

	// $state makes these reactive: when one changes, the page updates itself.
	// Same pattern used since Week 1.
	let title = $state('');
	let artist = $state('');
	let colorTag = $state('#5da9ff');
	let errorMessage = $state('');

	// Our own copy of the list, so the page can change straight away when we
	// add, toggle or delete a sketch, without reloading. It starts as whatever
	// load() gave us. (Svelte may warn that this "only captures the initial
	// value of data". That is exactly what we want here.)
	let sketches = $state(data.sketches);

	// Each of the three functions below does the same three things:
	//   1. fetch() one of OUR OWN API routes (never touching sketchData.js, which
	//      is server-only and cannot be imported into a .svelte file)
	//   2. check the answer was ok
	//   3. update `sketches` so the page matches what the server now holds
	//
	// `async` / `await`: fetch() takes time, so `await` means "pause this
	// function until the server answers, then carry on".

	// CREATE — POST /api/sketches
	async function addSketch(event) {
		event.preventDefault(); // stop the browser reloading the page on submit
		errorMessage = '';

		const response = await fetch('/api/sketches', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title: title, artist: artist, colorTag: colorTag })
		});

		if (!response.ok) {
			errorMessage = 'Could not add that sketch.';
			return;
		}

		// The server answers with the new sketch, including the id it chose.
		const newSketch = await response.json();

		// push adds to the end of the list. Svelte 5's $state notices, so the
		// page updates.
		sketches.push(newSketch);

		title = '';
		artist = '';
		colorTag = '#5da9ff';
	}

	// UPDATE — PATCH /api/sketches/:id
	// We send ONLY the field that changes: favourite, flipped.
	async function toggleFavourite(sketch) {
		errorMessage = '';

		const response = await fetch('/api/sketches/' + sketch.id, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ favourite: !sketch.favourite })
		});

		if (!response.ok) {
			errorMessage = 'Could not update that sketch.';
			return;
		}

		// The server answers with the updated sketch. Copy its favourite value
		// onto the sketch in our list, and the star changes.
		const updated = await response.json();
		sketch.favourite = updated.favourite;
	}

	// DELETE — DELETE /api/sketches/:id
	async function deleteSketch(sketch) {
		errorMessage = '';

		const response = await fetch('/api/sketches/' + sketch.id, {
			method: 'DELETE'
		});

		if (!response.ok) {
			errorMessage = 'Could not delete that sketch.';
			return;
		}

		// A successful DELETE sends back no body (status 204), so there is
		// nothing to read. We just rebuild our list without that sketch:
		// filter keeps every sketch whose id is NOT the one we deleted.
		sketches = sketches.filter((s) => s.id !== sketch.id);
	}
</script>

<main>
	<h1>Sketch Gallery</h1>
	<p><a href="/">← Home</a></p>

	{#if errorMessage}
		<p class="error">{errorMessage}</p>
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
	<form onsubmit={addSketch}>
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
		<button type="submit">Add sketch</button>
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
