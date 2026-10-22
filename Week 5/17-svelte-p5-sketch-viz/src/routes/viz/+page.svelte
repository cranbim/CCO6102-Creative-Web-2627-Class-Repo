<script>
	import p5 from 'p5';
	import { onMount, onDestroy } from 'svelte';

	let { data } = $props();

	/** @type {HTMLDivElement} */
	let container;
	// p5's own type declarations don't play nicely with plain JSDoc
	// checking in instance mode, so we deliberately type these loosely
	// as `any` rather than fight the library's types.
	/** @type {any} */
	let p5Instance;

	// p5 is wired in INSTANCE MODE via onMount/onDestroy — same pattern
	// as Weeks 1 & 3's p5 demos, and Week 4's asteroid visualisation
	// this project extends. Instance mode keeps p5 from polluting the
	// global window object, which matters when p5 lives alongside
	// SvelteKit's own reactivity.
	onMount(() => {
		/** @param {any} p */
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

					// favourite === true gets a bigger circle and a
					// visible ring — the "hidden logic" moment from
					// Track 1 (favourite was toggled via a PATCH
					// nobody outside Express's store module computes)
					// pays off visually here.
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
				});
			};
		};

		p5Instance = new p5(sketch, container);
	});

	onDestroy(() => {
		p5Instance?.remove();
	});
</script>

<main>
	<h1>Sketch Gallery — Visualised</h1>
	<p><a href="/">← Home</a> · <a href="/lab">Lab version →</a></p>

	<p class="caption">
		Each circle is one sketch from the SAME Express API Track 1 builds
		and edits — add a sketch via <code>16-sveltekit-sketch-gallery</code>'s
		form, then reload this page.
	</p>

	<div bind:this={container} class="canvas-holder"></div>

	<ul class="mapping-key">
		<li><strong>Colour</strong> — the sketch's <code>colorTag</code></li>
		<li><strong>Size + ring</strong> — <code>favourite === true</code></li>
		<li><strong>Label</strong> — the sketch's <code>title</code></li>
	</ul>
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
	.mapping-key {
		font-size: 0.9rem;
		color: #444;
	}
</style>
