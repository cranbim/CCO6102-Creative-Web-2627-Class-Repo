<script>
	// DuplicatedSketch.svelte
	// This is roughly what Week 1's svelte-p5-demo looked like: a DOM slider
	// updates a Svelte-side value, and that value gets manually pushed into a
	// SEPARATE variable that the p5 sketch actually reads in draw(). Two
	// copies of "size" exist at once.
	import p5 from 'p5';
	import { onMount, onDestroy } from 'svelte';

	let container;
	let p5Instance;

	// Copy #1 — drives the DOM label and slider.
	let domSize = $state(60);

	// Copy #2 — a plain variable the p5 closure reads from. Not reactive,
	// not shared, just a value living inside this component's scope.
	let sketchSize = 60;

	function handleSliderInput(event) {
		domSize = Number(event.target.value);
		// Without this line, the slider and label update fine, but the
		// circle on screen never changes size — try commenting it out.
		sketchSize = domSize;
	}

	onMount(() => {
		const sketch = (p) => {
			p.setup = () => {
				p.createCanvas(240, 240);
			};
			p.draw = () => {
				p.background(250);
				p.noStroke();
				p.fill(192, 57, 43);
				p.circle(p.width / 2, p.height / 2, sketchSize);
			};
		};
		p5Instance = new p5(sketch, container);
	});

	onDestroy(() => {
		p5Instance?.remove();
	});
</script>

<div class="demo demo-before">
	<h3>Before — two copies of the same value</h3>
	<div bind:this={container}></div>
	<label>
		Size: {domSize}px
		<input type="range" min="10" max="200" value={domSize} oninput={handleSliderInput} />
	</label>
	<p class="warning">
		Comment out the <code>sketchSize = domSize;</code> line above and reload —
		the label still updates, but the circle freezes. Two copies of the same
		value means two places it can go out of sync.
	</p>
</div>
