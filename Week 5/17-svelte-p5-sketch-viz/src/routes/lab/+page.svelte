<script>
	import p5 from 'p5';
	import { onMount, onDestroy } from 'svelte';

	let { data } = $props();

	let container;
	let sketchInstance;

	onMount(() => {
		const sketch = (p) => {
			p.setup = () => {
				p.createCanvas(700, 400).parent(container);
				p.textAlign(p.CENTER);
			};

			p.draw = () => {
				p.background(250);

				const sketches = data.sketches;
				const spacing = p.width / (sketches.length + 1);

				sketches.forEach((s, i) => {
					const x = spacing * (i + 1);
					const y = p.height / 2;
					const size = s.favourite ? 90 : 60;

					if (s.favourite) {
						p.stroke(245, 166, 35);
						p.strokeWeight(4);
					} else {
						p.noStroke();
					}

					p.fill(s.colorTag);
					p.circle(x, y, size);

					p.noStroke();
					p.fill(40);
					p.textSize(13);
					p.text(s.title, x, y + size / 2 + 20);

					// TODO (lab) 1: the `artist` field exists on every sketch
					// (s.artist) but isn't drawn anywhere yet. Add a second
					// line of text below the title — e.g.
					// p.textSize(11); p.fill(120);
					// p.text(`by ${s.artist}`, x, y + size / 2 + 36);
					// Try a different visual treatment too, if you'd rather
					// not just add more text — colour, size, position are
					// all fair game.
				});

				// TODO (stretch): the favourite ring above is static. Try
				// animating it — e.g. vary strokeWeight or the ring's size
				// using p.sin(p.frameCount * 0.05) to make favourites
				// visibly "pulse". p.draw() already runs on a loop
				// (~60fps by default), so anything based on p.frameCount
				// will animate automatically.
			};
		};

		sketchInstance = new p5(sketch, container);
	});

	onDestroy(() => {
		if (sketchInstance) sketchInstance.remove();
	});
</script>

<main>
	<h1>Sketch Gallery — Lab</h1>
	<p><a href="/">← Home</a> · <a href="/viz">Finished demo →</a></p>

	<p class="caption">
		Same starting point as <code>/viz</code>. One TODO and one STRETCH
		are marked in this page's <code>&lt;script&gt;</code> block — see
		the README for the full task.
	</p>

	<div bind:this={container} class="canvas-holder"></div>
</main>

<style>
	main {
		max-width: 44rem;
		margin: 2rem auto;
		padding: 0 1.5rem;
		font-family: system-ui, sans-serif;
	}
	.caption {
		color: #555;
		font-size: 0.9rem;
	}
	.canvas-holder {
		margin: 1rem 0;
	}
</style>
