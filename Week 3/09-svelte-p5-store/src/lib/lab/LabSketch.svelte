<script>
	// LabSketch.svelte — LAB EXERCISE
	//
	// Starts as a copy of the "After" demo (size only). Your task: add a
	// second shared value — hue — following the same pattern.
	//
	// TODO (core exercise):
	// 1. Open ../shared/sketchState.svelte.js and add a `hue` property to the
	//    sketchState object (try starting it at 140), plus a `setHue(newHue)`
	//    function, following the same shape as `size` / `setSize`.
	// 2. Add a second range input below, wired to setHue, similar to the size
	//    slider — hue in p5's default HSB range is 0–360, but for a friendly
	//    range try limiting the slider to 0–360 anyway and see what happens
	//    at the extremes.
	// 3. In the draw() function below, switch to p.colorMode(p.HSB) in setup(),
	//    and use sketchState.hue in the p.fill(...) call instead of the fixed
	//    RGB fill currently there.
	//
	// STRETCH CHALLENGE:
	// Add a THIRD shared value of your choosing (e.g. a rotation speed, or a
	// second shape) and wire it the same way. If you want a bigger stretch,
	// try making the circle's x-position follow a shared value driven by a
	// slider too, so two sliders control two independent aspects of the same
	// sketch — same shared-state pattern, just more of it.

	import p5 from 'p5';
	import { onMount, onDestroy } from 'svelte';
	import { sketchState, setSize } from '../shared/sketchState.svelte.js';

	let container;
	let p5Instance;

	function handleSizeInput(event) {
		setSize(Number(event.target.value));
	}

	onMount(() => {
		const sketch = (p) => {
			p.setup = () => {
				p.createCanvas(240, 240);
				// TODO: p.colorMode(p.HSB) goes here once you're using hue.
			};
			p.draw = () => {
				p.background(250);
				p.noStroke();
				p.fill(39, 174, 96); // TODO: replace with an HSB fill using sketchState.hue
				p.circle(p.width / 2, p.height / 2, sketchState.size);
			};
		};
		p5Instance = new p5(sketch, container);
	});

	onDestroy(() => {
		p5Instance?.remove();
	});
</script>

<div class="demo demo-lab">
	<h3>Lab — add a second shared value</h3>
	<div bind:this={container}></div>
	<label>
		Size: {sketchState.size}px
		<input type="range" min="10" max="200" value={sketchState.size} oninput={handleSizeInput} />
	</label>
	<!-- TODO: add your hue slider here, following the pattern above -->
</div>
