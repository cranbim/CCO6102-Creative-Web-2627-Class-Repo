<script>
	// DeepAfter.svelte
	// Imports the shared state directly from the module, however deep it's
	// nested. It doesn't matter how many components sit between here and
	// PageAfter — this import line would be identical at any depth.
	import { counter, increment } from '../shared/counterState.svelte.js';
</script>

<div class="panel-inner deep">
	<p class="path">...DeepAfter imports the shared state directly.</p>
	<p class="count">Count: {counter.count}</p>
	<button onclick={increment}>Increment</button>
</div>
