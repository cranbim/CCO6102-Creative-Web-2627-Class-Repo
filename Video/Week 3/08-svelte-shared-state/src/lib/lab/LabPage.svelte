<script>
	// LabPage.svelte — LAB EXERCISE, starts here.
	//
	// This is a fresh scenario (not the counter demo) still using props —
	// deliberately, so you're refactoring real code yourself rather than
	// re-typing what you just watched.
	//
	// TODO (core exercise):
	// 1. Create src/lib/lab/favouriteState.svelte.js, following the shape of
	//    ../shared/counterState.svelte.js — export a $state object holding
	//    `colour` (a string), plus a `setColour(newColour)` function.
	// 2. Update LabDeep.svelte to import from your new file instead of
	//    receiving `colour` and `setColour` as props.
	// 3. Update LabMiddle.svelte to stop passing `colour`/`setColour` through
	//    — it shouldn't need to know about them at all once the refactor is done.
	// 4. Remove the two lines below that declare and pass `colour`/`setColour`
	//    down from here — LabPage shouldn't own this state any more either.
	import LabMiddle from './LabMiddle.svelte';

	let colour = $state('tomato');

	function setColour(newColour) {
		colour = newColour;
	}
</script>

<div class="panel panel-lab">
	<h3>Lab — your turn</h3>
	<p class="path">LabPage currently owns `colour`, passed down via props...</p>
	<LabMiddle {colour} {setColour} />
</div>
