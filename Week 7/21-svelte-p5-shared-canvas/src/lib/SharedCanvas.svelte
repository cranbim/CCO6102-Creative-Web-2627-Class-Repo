<script>
	// SharedCanvas.svelte — a p5 drawing canvas that shares every stroke over a WebSocket.
	//
	// Both pages use this component. The page opens the socket and hands it in;
	// this component only draws, sends strokes, and draws the strokes it receives.
	//
	// Props (passed in by the page, like any Week 2 component):
	//   socket — the open WebSocket to the relay
	//   room   — the room code to put in every stroke ('' on the "together" page)

	import { onMount, onDestroy } from 'svelte';
	import p5 from 'p5';

	let { socket, room } = $props();

	// The <div> the canvas goes into (bind:this below fills it in).
	let container;
	let sketchInstance;

	// Each person gets one random colour when the page loads, so you can tell
	// whose stroke is whose. Colours travel as text like '#e63946', which p5's
	// stroke() understands directly.
	const colours = ['#e63946', '#2a9d8f', '#e9c46a', '#264653', '#f4a261', '#8338ec', '#3a86ff'];
	const myColour = colours[Math.floor(Math.random() * colours.length)];

	// One stroke is one short line, from where the mouse was a moment ago
	// (px, py) to where it is now (x, y). It looks like this:
	//   { type: 'stroke', room: '4821', x: 0.52, y: 0.31, px: 0.50, py: 0.30, colour: '#e63946' }
	//
	// The positions are FRACTIONS of the canvas (0 = left/top edge, 1 = right/bottom),
	// not pixels. Your laptop's canvas and someone's phone canvas are different
	// sizes, so "halfway across" (0.5) means the same place on both, while
	// "300 pixels across" wouldn't.
	function drawStroke(p, stroke) {
		p.stroke(stroke.colour);
		p.line(stroke.px * p.width, stroke.py * p.height, stroke.x * p.width, stroke.y * p.height);
	}

	// 'message' listener: when the relay passes on someone else's stroke, draw it.
	// (The page may receive other kinds of message too; we only care about strokes.)
	function handleMessage(event) {
		const message = JSON.parse(event.data);
		if (message.type === 'stroke' && sketchInstance) {
			drawStroke(sketchInstance, message);
		}
	}

	// onMount runs once, in the browser, after the component appears.
	onMount(() => {
		// Instance mode, as in every p5 demo since Week 1: everything p5 offers
		// hangs off the p we are given, so p.createCanvas(...) not createCanvas(...).
		sketchInstance = new p5((p) => {
			p.setup = () => {
				// Fit the canvas to small screens (phones), up to 600 pixels wide,
				// keeping a 3:2 shape. The fractions above make different sizes line up.
				const canvasWidth = Math.min(600, window.innerWidth - 40);
				p.createCanvas(canvasWidth, canvasWidth * (2 / 3));
				p.background(250);
				p.strokeWeight(4);
			};

			// mouseDragged runs whenever the mouse moves with a button held down
			// (and when a finger moves on a touch screen). p5 gives us the mouse
			// position now (mouseX, mouseY) and a moment ago (pmouseX, pmouseY).
			p.mouseDragged = () => {
				// mouseDragged fires even when dragging outside the canvas, so
				// ignore anything that isn't on it.
				if (p.mouseX < 0 || p.mouseX > p.width || p.mouseY < 0 || p.mouseY > p.height) {
					return;
				}

				const stroke = {
					type: 'stroke',
					room: room,
					x: p.mouseX / p.width,
					y: p.mouseY / p.height,
					px: p.pmouseX / p.width,
					py: p.pmouseY / p.height,
					colour: myColour
				};

				// Draw it on our own canvas straight away, then tell everyone else.
				drawStroke(p, stroke);
				if (socket.readyState === WebSocket.OPEN) {
					socket.send(JSON.stringify(stroke));
				}
			};
		}, container);

		socket.addEventListener('message', handleMessage);
	});

	// Stop the sketch so it doesn't keep running, and stop listening to the socket.
	// onDestroy also runs during server rendering, where neither exists, hence the checks.
	onDestroy(() => {
		if (sketchInstance) {
			sketchInstance.remove();
		}
		if (socket) {
			socket.removeEventListener('message', handleMessage);
		}
	});
</script>

<div class="canvas" bind:this={container}></div>

<style>
	.canvas {
		/* Stop a phone scrolling the page while you draw on the canvas. */
		touch-action: none;
		display: inline-block;
		border: 1px solid #ccc;
	}
</style>
