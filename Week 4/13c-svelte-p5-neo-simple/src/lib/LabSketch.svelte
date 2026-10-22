<script>
	import { onMount, onDestroy } from 'svelte';
	import p5 from 'p5';

	// The page gives us the list of asteroids: <LabSketch asteroids={...} />
	let { asteroids } = $props();

	let container; // the <div> that p5 draws into (filled in by bind:this below)
	let sketchInstance; // the running sketch, so we can stop it when the page closes

	// Finds the biggest value of one field in the list, for example
	// largest(list, 'diameterKm', 0.05). The `minimum` stops us dividing by zero.
	function largest(list, field, minimum) {
		let biggest = minimum;
		for (let i = 0; i < list.length; i++) {
			if (list[i][field] > biggest) {
				biggest = list[i][field];
			}
		}
		return biggest;
	}

	// onMount runs once, in the browser, after the page appears.
	onMount(() => {
		// p5 "instance mode": everything p5 offers hangs off the `p` we are given,
		// so p.createCanvas(...) instead of createCanvas(...).
		const sketch = (p) => {
			// One orbit angle and radius per asteroid, remembered between frames.
			const orbits = [];

			p.setup = () => {
				p.createCanvas(container.clientWidth, 420);
				p.colorMode(p.HSB, 360, 100, 100);
				p.noStroke();
			};

			p.draw = () => {
				p.background(10, 10, 15);

				// Read the asteroids again every frame, so the sketch always
				// uses the latest list.
				const list = asteroids;

				// Give each new asteroid a starting angle at a random spot.
				while (orbits.length < list.length) {
					orbits.push({ angle: p.random(p.TWO_PI), radius: 0 });
				}

				const maxDiameter = largest(list, 'diameterKm', 0.05);
				const maxMissDistance = largest(list, 'missDistanceKm', 1);
				const maxScore = largest(list, 'dangerScore', 1);

				for (let i = 0; i < list.length; i++) {
					const asteroid = list[i];
					const orbit = orbits[i];

					// Velocity decides how fast it orbits.
					orbit.angle += 0.0005 + (asteroid.velocityKmH / 200000) * 0.01;

					// Miss distance decides the orbit radius: close misses sit near the middle.
					const targetRadius = 40 + (asteroid.missDistanceKm / maxMissDistance) * (p.width / 2 - 60);
					orbit.radius += (targetRadius - orbit.radius) * 0.05; // ease towards it

					const x = p.width / 2 + Math.cos(orbit.angle) * orbit.radius;
					const y = p.height / 2 + Math.sin(orbit.angle) * orbit.radius;

					// Diameter decides the size.
					const size = 6 + (asteroid.diameterKm / maxDiameter) * 40;

					// The danger score decides the colour, green (low) to red (high).
					// It was calculated on the server. We only ever see the number.
					const scoreRatio = asteroid.dangerScore / maxScore;
					const hue = 130 - scoreRatio * 130; // 130 = green, 0 = red

					p.fill(hue, 80, 90, 0.9);
					p.circle(x, y, size);

					// LAB: every asteroid also has asteroid.hazardous, which is true or
					// false. Nothing draws it yet. Make hazardous asteroids look
					// different: a ring around them, an outline, a pulse...
					// Hint: p.frameCount counts up every frame. Feed it to p.sin() to
					// make something pulse. Remember p.noFill() and p.stroke(...) to
					// draw a ring, and p.noStroke() afterwards to switch the outline off.

					// STRETCH: only draw asteroids whose dangerScore is above a limit
					// you can change. You will need a new $state variable and an
					// <input type="range"> on the lab page.
				}

				// A marker in the middle for Earth.
				p.fill(48, 90, 100);
				p.circle(p.width / 2, p.height / 2, 14);
			};

			p.windowResized = () => {
				p.resizeCanvas(container.clientWidth, 420);
			};
		};

		sketchInstance = new p5(sketch, container);
	});

	// When the page closes, stop the sketch so it doesn't keep running.
	onDestroy(() => {
		if (sketchInstance) {
			sketchInstance.remove();
		}
	});
</script>

<div bind:this={container} class="sketch-container"></div>

<style>
	.sketch-container {
		width: 100%;
		border-radius: 8px;
		overflow: hidden;
	}
</style>
