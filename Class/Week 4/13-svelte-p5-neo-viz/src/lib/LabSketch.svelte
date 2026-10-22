<script>
	import { onMount, onDestroy } from 'svelte';
	import p5 from 'p5';

	/**
	 * @typedef {{
	 *   id: string, name: string, diameterKm: number, velocityKmH: number,
	 *   missDistanceKm: number, hazardous: boolean, dangerScore: number
	 * }} Asteroid
	 */

	/** @type {{ asteroids: Asteroid[] }} */
	let { asteroids = [] } = $props();

	/** @type {HTMLDivElement} */
	let container;
	/** @type {any} */
	let sketchInstance = null;

	onMount(() => {
		/** @param {any} s */
		const sketch = (s) => {
			/** @type {{ angle: number, radius: number, hue: number }[]} */
			let orbitState = [];

			s.setup = () => {
				s.createCanvas(container.clientWidth, 420);
				s.colorMode(s.HSB, 360, 100, 100);
				s.noStroke();
			};

			s.draw = () => {
				s.background(10, 10, 15);

				const list = asteroids;

				// Lazily grow our per-asteroid orbit state if the list changes.
				while (orbitState.length < list.length) {
					orbitState.push({
						angle: s.random(s.TWO_PI),
						radius: 0,
						hue: 0
					});
				}

				const maxDiameter = Math.max(0.05, ...list.map((a) => a.diameterKm));
				const maxMissDistance = Math.max(1, ...list.map((a) => a.missDistanceKm));
				const maxScore = Math.max(1, ...list.map((a) => a.dangerScore));

				list.forEach((asteroid, i) => {
					const state = orbitState[i];

					// Velocity drives how fast the particle orbits — this is the
					// only place velocityKmH is used.
					const angularSpeed = 0.0005 + (asteroid.velocityKmH / 200000) * 0.01;
					state.angle += angularSpeed;

					// Miss distance drives orbit radius — closer approaches sit
					// nearer the centre.
					const targetRadius =
						40 + (asteroid.missDistanceKm / maxMissDistance) * (s.height / 2 - 60);
					state.radius += (targetRadius - state.radius) * 0.05;

					const x = s.width / 2 + Math.cos(state.angle) * state.radius;
					const y = s.height / 2 + Math.sin(state.angle) * state.radius;

					// Diameter drives particle size.
					const size = 6 + (asteroid.diameterKm / maxDiameter) * 40;

					// The danger score — computed server-side, formula never
					// shipped to this client — drives colour. We only ever see
					// the number, from green (low) to red (high).
					const scoreRatio = asteroid.dangerScore / maxScore;
					const hue = 130 - scoreRatio * 130; // 130 = green, 0 = red

					s.fill(hue, 80, 90, 0.9);
					s.circle(x, y, size);

					// TODO (lab exercise): every asteroid also has a
					// `hazardous` boolean (asteroid.hazardous) that isn't
					// mapped to anything visual yet. Add something that
					// makes hazardous asteroids visually distinct — e.g. a
					// pulsing outer ring, an outline, or a small icon.
					// Hint: s.frameCount gives you an ever-increasing number
					// you can feed into s.sin() for a pulse effect.

					// STRETCH CHALLENGE: add a threshold — e.g. only draw
					// asteroids above a certain dangerScore, or fade out
					// ones below a minimum diameter. You'll need a new
					// $state variable in this component (or passed as a
					// prop) to hold the threshold, and probably an <input
					// type="range"> in lab/+page.svelte to control it.
				});

				// Sun/Earth marker at the centre for orientation.
				s.fill(48, 90, 100);
				s.circle(s.width / 2, s.height / 2, 14);
			};

			s.windowResized = () => {
				s.resizeCanvas(container.clientWidth, 420);
			};
		};

		sketchInstance = new p5(sketch, container);
	});

	onDestroy(() => {
		sketchInstance?.remove();
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
