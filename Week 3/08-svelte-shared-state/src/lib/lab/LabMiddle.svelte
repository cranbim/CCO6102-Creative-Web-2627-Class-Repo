<script>
	// LabMiddle.svelte
	// Same "innocent bystander" role as MiddleBefore.svelte in the demo —
	// it doesn't use colour/setColour, just passes them through.
	//
	// TODO: once your shared state file exists and LabPage/LabDeep no longer
	// need this component to relay anything, delete the two props below and
	// the {colour} {setColour} passed to <LabDeep>.
	import LabDeep from './LabDeep.svelte';

	let { colour, setColour } = $props();
</script>

<div class="panel-inner">
	<p class="path">...through LabMiddle, which doesn't use colour either...</p>
	<LabDeep {colour} {setColour} />
</div>
