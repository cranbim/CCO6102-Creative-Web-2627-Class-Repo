<script>
	// PageBefore.svelte
	// Owns the state, because SOMETHING has to. In a props-only world, the
	// component that owns the data is often several levels above the
	// component that actually needs to display/change it.
	import MiddleBefore from './MiddleBefore.svelte';

	let count = $state(0);

	function increment() {
		count += 1;
	}
</script>

<div class="panel panel-before">
	<h3>Before — props all the way down</h3>
	<p class="path">PageBefore owns the state...</p>
	<MiddleBefore {count} {increment} />
</div>
