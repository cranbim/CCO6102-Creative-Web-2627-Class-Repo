<script>
	// SharedSketch.svelte
	// Same UI and same sketch, but sketchState.size is the ONLY copy of the
	// value. The slider mutates it directly; draw() reads it directly. There
	// is nothing to remember to keep in sync, because there's nothing to sync.
	import p5 from 'p5';
	import { onMount, onDestroy } from 'svelte';
	import { sketchState, setSize } from '../shared/sketchState.svelte.js';

	let container;
	let p5Instance;

	function handleSliderInput(event) {
		setSize(Number(event.target.value));
	}

	onMount(() => {
		const sketch = (p) => {
			p.setup = () => {
				p.createCanvas(240, 240);
			};
			p.draw = () => {
				p.background(250);
				p.noStroke();
				p.fill(39, 174, 96);
				// Reads the shared state directly, every frame. No local copy.
				p.circle(p.width / 2, p.height / 2, sketchState.size);
			};
		};
		p5Instance = new p5(sketch, container);
	});

	onDestroy(() => {
		p5Instance?.remove();
	});
</script>

<div class="demo demo-after">
	<h3>After — one shared value</h3>
	<div bind:this={container}></div>
	<label>
		Size: {sketchState.size}px
		<input type="range" min="10" max="200" value={sketchState.size} oninput={handleSliderInput} />
	</label>
</div>
