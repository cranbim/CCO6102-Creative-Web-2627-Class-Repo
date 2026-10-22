<script>
	// Instance mode: everything p5 offers hangs off the `p` we are
	// given, so p.createCanvas(...) instead of createCanvas(...). This
	// keeps p5 from polluting the global window object, which matters
	// when p5 lives alongside SvelteKit's own reactivity. Static
	// import, same as Weeks 1 & 3 — p5 doesn't touch the browser's
	// `window` until a sketch actually runs inside onMount, so there's
	// no server-rendering problem to work around here.
	import p5 from 'p5';
	import { onMount, onDestroy } from 'svelte';

	let { data } = $props();

	let container;
	let sketchInstance;

	// onMount runs once, in the browser, after the page appears —
	// never call browser-only code like this at the top level of a
	// component, because that code also runs during server rendering,
	// where there's no window or canvas to draw into.
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

					// favourite === true gets a bigger circle and a
					// visible ring — the "hidden logic" moment from
					// Track 1 (favourite was toggled via a PATCH
					// nobody outside Express's data module computes)
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

		sketchInstance = new p5(sketch, container);
	});

	// onDestroy: stop the sketch so it doesn't keep running after the
	// page is gone. We check sketchInstance exists first, rather than
	// reaching for the ?. operator, since the check is only two words
	// longer and reads the same way a plain JS "if" always has.
	onDestroy(() => {
		if (sketchInstance) sketchInstance.remove();
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
