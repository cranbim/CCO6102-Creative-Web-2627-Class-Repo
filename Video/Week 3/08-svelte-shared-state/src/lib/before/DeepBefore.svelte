<script>
	// DeepBefore.svelte
	// The only component that actually cares about `count` — two levels
	// down from where it's owned.
	let { count, increment } = $props();
</script>

<div class="panel-inner deep">
	<p class="path">...to DeepBefore, which finally uses it.</p>
	<p class="count">Count: {count}</p>
	<button onclick={increment}>Increment</button>
</div>
