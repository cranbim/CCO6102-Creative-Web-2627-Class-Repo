<script>
	// PageAfter.svelte
	// Same three-level component structure as the "Before" version — deliberately,
	// so the ONLY difference students see is how the state gets to DeepAfter.
	// PageAfter doesn't own the count anymore. Nobody "owns" it in the props
	// sense; it lives in the shared module and any component can import it.
	import MiddleAfter from './MiddleAfter.svelte';
</script>

<div class="panel panel-after">
	<h3>After — shared state module</h3>
	<p class="path">PageAfter doesn't hold the count at all...</p>
	<MiddleAfter />
</div>
