// A plain JS module under src/lib — SvelteKit makes everything here
// importable from anywhere in the app via the #lib alias, e.g.
// `import { sketches } from '#lib/sketches.js'`.
//
// This is deliberately hardcoded, local data — no fetch, no API, no
// load function. The point of this whole demo is routing and shared
// code, not data-fetching (that's a separate, later demo).

export const sketches = [
	{
		slug: 'orbiting-dots',
		title: 'Orbiting Dots',
		description: 'A handful of particles circling a shared centre point at different speeds.',
		color: '#e07a5f'
	},
	{
		slug: 'colour-field',
		title: 'Colour Field',
		description: 'A grid of cells that slowly drift between hues based on a noise function.',
		color: '#3d405b'
	},
	{
		slug: 'wandering-line',
		title: 'Wandering Line',
		description: 'A single continuous line that never crosses itself, redrawn every frame.',
		color: '#81b29a'
	},
	{
		slug: 'pulse-grid',
		title: 'Pulse Grid',
		description: 'A grid of circles that pulse in size following a wave pattern across the canvas.',
		color: '#f2cc8f'
	}
];
