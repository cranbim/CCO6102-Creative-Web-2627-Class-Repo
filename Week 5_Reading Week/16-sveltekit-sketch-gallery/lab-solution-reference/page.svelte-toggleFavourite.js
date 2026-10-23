// TUTOR-ONLY REFERENCE — the finished toggleFavourite(), to replace the
// stub of the same name in src/routes/gallery/+page.svelte. Same pattern
// as handleSubmit() just above it in that file.

async function toggleFavourite(sketch) {
	try {
		const res = await fetch(`/api/sketches/${sketch.id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ favourite: !sketch.favourite })
		});

		if (!res.ok) {
			throw new Error(`Request failed with status ${res.status}`);
		}

		const updated = await res.json();

		// Find the matching sketch in our local list and copy the
		// updated favourite value onto it. Svelte 5's $state makes this
		// direct mutation reactive, same reasoning as handleSubmit()'s
		// sketches.push(newSketch) above.
		const match = sketches.find((s) => s.id === updated.id);
		if (match) {
			match.favourite = updated.favourite;
		}
	} catch (err) {
		console.error('Could not update favourite:', err);
	}
}
