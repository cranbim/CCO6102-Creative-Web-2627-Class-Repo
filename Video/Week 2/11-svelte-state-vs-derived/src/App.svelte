<script>
	// App.svelte
	//
	// Both `doubledPlain` and `doubledDerived` compute the same thing —
	// count * 2 — and both are used TWICE below (once in the main display,
	// once in the summary line). Open the browser console, then click
	// Increment once and count the log lines. That's the real difference.
	//
	// (An earlier draft of this demo tried to show the difference via an
	// UNRELATED second $state value, on the assumption that the plain
	// function would re-run on any render, React-style. Tested that against
	// Svelte 5's actual reactivity and it doesn't hold — Svelte's
	// fine-grained tracking means a plain function read in the template
	// only re-runs when the $state values IT reads change, same as
	// $derived, regardless of what else is on the page. The real
	// difference shows up when a value is used more than once, below.)

	let count = $state(0);

	function doubledPlain() {
		console.log('%cplain function called', 'color: #c0392b');
		return count * 2;
	}

	let doubledDerived = $derived.by(() => {
		console.log('%c$derived recalculated', 'color: #27ae60');
		return count * 2;
	});
</script>

<main>
	<h1>$state vs $derived</h1>
	<p class="intro">
		Open the browser console, then click Increment once and count how many
		times each colour logs. Both values are read <strong>twice</strong>
		below — once in the main display, once in the summary line.
	</p>

	<button onclick={() => count++}>Increment ({count})</button>

	<div class="results">
		<div class="result">
			<h3>Plain function</h3>
			<p class="value">{doubledPlain()}</p>
			<p class="caption">Summary: doubled is {doubledPlain()}</p>
			<p class="explain">Called once per usage — twice the work for one value.</p>
		</div>
		<div class="result">
			<h3>$derived</h3>
			<p class="value">{doubledDerived}</p>
			<p class="caption">Summary: doubled is {doubledDerived}</p>
			<p class="explain">Computed once, both usages read the same cached result.</p>
		</div>
	</div>
</main>

<style>
	main {
		max-width: 600px;
		margin: 2rem auto;
		font-family: system-ui, sans-serif;
		padding: 0 1rem;
	}

	.intro {
		color: #555;
	}

	.results {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.result {
		border: 1px solid #ddd;
		border-radius: 8px;
		padding: 1rem;
	}

	.value {
		font-size: 2rem;
		font-weight: bold;
		margin: 0.5rem 0;
	}

	.caption {
		font-size: 0.9rem;
		color: #555;
		margin: 0 0 0.5rem 0;
	}

	.explain {
		font-size: 0.8rem;
		color: #888;
		margin: 0;
	}
</style>
