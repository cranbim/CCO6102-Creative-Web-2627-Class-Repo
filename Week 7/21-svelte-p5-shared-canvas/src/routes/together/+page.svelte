<script>
	// together/+page.svelte — Track 2 demo: one canvas for everyone.
	//
	// Needs the plain Track 1 relay (npm start in 19-express-ws-relay).
	// That relay never looks inside messages, so it passes strokes on exactly as
	// happily as chat messages: no relay changes for drawing at all.
	//
	// It also sends each stroke back to the person who drew it. We've already
	// drawn it, so drawing the same line a second time changes nothing you can see.

	import { onMount, onDestroy } from 'svelte';
	import { RELAY_URL } from '#lib/relay.js';
	import SharedCanvas from '#lib/SharedCanvas.svelte';

	// $state (not a plain variable) so the {#if} below notices when the socket
	// is ready and only then shows the canvas, which needs a socket to work.
	let socket = $state(null);
	let status = $state('Connecting...');

	onMount(() => {
		const newSocket = new WebSocket(RELAY_URL);
		newSocket.addEventListener('open', () => {
			status = 'Connected: everyone on this page shares one canvas';
			socket = newSocket;
		});
		newSocket.addEventListener('close', () => {
			status = 'Disconnected. Is the relay running? Reload the page to try again.';
		});
	});

	onDestroy(() => {
		if (socket) {
			socket.close();
		}
	});
</script>

<h1>Everyone together</h1>
<p>{status}</p>

{#if socket}
	<SharedCanvas socket={socket} room="" />
{/if}
