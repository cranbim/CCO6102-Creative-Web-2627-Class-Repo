<script>
	// LabDeep.svelte
	// TODO: replace the props line below with an import from your new
	// favouriteState.svelte.js, the same way DeepAfter.svelte imports from
	// ../shared/counterState.svelte.js. Once done, this component should read
	// and set the colour directly, with no props involved.
	let { colour, setColour } = $props();

	const swatches = ['tomato', 'goldenrod', 'seagreen', 'steelblue', 'orchid'];
</script>

<div class="panel-inner deep">
	<p class="path">...to LabDeep, which uses it to set a background colour.</p>
	<div class="swatch" style="background-color: {colour}"></div>
	<div class="swatch-buttons">
		{#each swatches as swatch}
			<button style="background-color: {swatch}" onclick={() => setColour(swatch)} aria-label={swatch}></button>
		{/each}
	</div>
</div>

<!--
	STRETCH CHALLENGE (once the core refactor above is working):
	Add a second shared value to your favouriteState.svelte.js — e.g. a
	`favouritesCount` number that increments every time a swatch is clicked —
	and display it here. This mirrors the "extend the DOM-to-p5 mapping with
	an additional shared value" challenge in Track 2's post-study, so it's
	good practice for that.
-->
