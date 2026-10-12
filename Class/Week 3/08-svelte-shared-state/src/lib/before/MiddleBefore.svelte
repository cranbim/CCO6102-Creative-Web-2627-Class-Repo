<script>
	// MiddleBefore.svelte
	// This component doesn't use `count` or `increment` for anything of its
	// own — it just has to accept them and pass them further down, purely
	// because DeepBefore is nested inside it. This is the "clumsy and
	// repetitive" feeling the Week 2 pre-study prompt asked you to recall.
	import DeepBefore from './DeepBefore.svelte';

	let { count, increment } = $props();
</script>

<div class="panel-inner">
	<p class="path">...through MiddleBefore, which doesn't care about count at all...</p>
	<DeepBefore {count} {increment} />
</div>
