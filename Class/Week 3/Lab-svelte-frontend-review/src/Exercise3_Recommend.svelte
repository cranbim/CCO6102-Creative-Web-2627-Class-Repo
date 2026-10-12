<script>
	// Exercise3_Recommend.svelte — EXERCISE 3: STRETCH
	//
	// Less hand-holding this time — you've got the pieces, the rest is up
	// to you. Given: a genre picker (bind:value, already wired) and a
	// button that's supposed to fetch a recommendation.
	//
	// Your tasks, in order of difficulty:
	//
	// 1. FIX THE BUG. getRecommendationClick() below has the same problem
	//    as Before.svelte in the async/await demo — click the button and
	//    check the browser console or the result text to see it. Same
	//    fix as that demo: two words.
	//
	// 2. ADD A LOADING STATE. While waiting for the recommendation,
	//    disable the button and show something like "Thinking…" instead
	//    of "Get a recommendation". Look at After.svelte (async/await
	//    demo) for the pattern — same idea, applied here.
	//
	// 3. HANDLE THE EMPTY CASE. If someone clicks the button before
	//    choosing a genre, don't call the API at all — show a message
	//    asking them to pick a genre first instead.
	//
	// No stretch-beyond-the-stretch is provided this time — if you finish
	// all three, try inventing your own extra feature (a "surprise me"
	// button that picks a random genre? a history of past
	// recommendations, using {#each}?).
	import { getRecommendation } from './recommendations.js';

	let genre = $state('');

	/** @type {string | Promise<string>} */
	let recommendation = $state('');

	function getRecommendationClick() {
		recommendation = getRecommendation(genre);
	}
</script>

<section>
	<h3>Exercise 3 — Stretch: what should I read next?</h3>
	<p class="task">
		Fewer hints this time — the three tasks are in the comments at the
		top of this file's <code>&lt;script&gt;</code> block.
	</p>

	<label>
		Genre:
		<select bind:value={genre}>
			<option value="">-- choose a genre --</option>
			<option value="fantasy">Fantasy</option>
			<option value="sci-fi">Sci-Fi</option>
			<option value="mystery">Mystery</option>
			<option value="horror">Horror</option>
		</select>
	</label>

	<button onclick={getRecommendationClick}>Get a recommendation</button>

	<p class="result">{recommendation}</p>
</section>

<style>
	label {
		display: block;
		margin-bottom: 0.5rem;
	}

	.result {
		font-weight: bold;
		min-height: 1.5em;
	}

	.task {
		background: #eef6ff;
		border: 1px solid #cfe3fb;
		border-radius: 6px;
		padding: 0.75rem;
		font-size: 0.9rem;
		margin-bottom: 0.75rem;
	}
</style>
