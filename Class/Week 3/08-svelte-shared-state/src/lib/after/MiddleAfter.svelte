<script>
	// MiddleAfter.svelte
	// No $props() at all. Nothing to pass through, because there's nothing
	// being drilled. Compare this file to MiddleBefore.svelte — that's the
	// whole lesson in two files.
	import DeepAfter from './DeepAfter.svelte';
</script>

<div class="panel-inner">
	<p class="path">...MiddleAfter has nothing to pass through, so it doesn't...</p>
	<DeepAfter />
</div>
