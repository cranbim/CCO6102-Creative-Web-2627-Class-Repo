<script>
	// rooms/+page.svelte — Track 2 demo: create a room, or join one with a 4-digit code.
	//
	// Needs the rooms relay (npm run rooms in 19-express-ws-relay).
	// The flow, in messages:
	//   we send  { type: 'create' }                or  { type: 'join', room: '4821' }
	//   we get   { type: 'joined', room: '4821' }  or  { type: 'error', text: '...' }
	// Once we've joined, the canvas appears, and every stroke carries the room code.

	import { onMount, onDestroy } from 'svelte';
	import { RELAY_URL } from '#lib/relay.js';
	import SharedCanvas from '#lib/SharedCanvas.svelte';

	let socket = $state(null);
	let status = $state('Connecting...');

	// The room we're in. An empty string means "not in a room yet", which is
	// what decides whether the page shows the create/join choice or the canvas.
	let room = $state('');

	// What's typed in the join box. A text input (not type="number") so the
	// code stays text like '0420' and matches the relay's codes exactly.
	let codeTyped = $state('');

	// Shown when the relay says no (e.g. a room code that doesn't exist).
	let errorText = $state('');

	onMount(() => {
		const newSocket = new WebSocket(RELAY_URL);

		newSocket.addEventListener('open', () => {
			status = 'Connected';
			socket = newSocket;
		});

		newSocket.addEventListener('close', () => {
			status = 'Disconnected. Is the relay running? Reload the page to try again.';
		});

		// The page listens for the relay's replies about rooms.
		// (SharedCanvas listens on the same socket for strokes.)
		newSocket.addEventListener('message', (event) => {
			const message = JSON.parse(event.data);
			if (message.type === 'joined') {
				room = message.room;
				errorText = '';
			}
			if (message.type === 'error') {
				errorText = message.text;
			}
		});
	});

	onDestroy(() => {
		if (socket) {
			socket.close();
		}
	});

	function createRoom() {
		socket.send(JSON.stringify({ type: 'create' }));
	}

	function joinRoom(event) {
		// Stop the browser's normal form behaviour (reloading the page).
		event.preventDefault();
		socket.send(JSON.stringify({ type: 'join', room: codeTyped }));
	}
</script>

<h1>Rooms</h1>
<p>{status}</p>

{#if socket && room === ''}
	<p><button onclick={createRoom}>Create a new room</button></p>

	<form onsubmit={joinRoom}>
		<label>
			or join a room:
			<input bind:value={codeTyped} placeholder="4-digit code" inputmode="numeric" maxlength="4" size="8" />
		</label>
		<button>Join</button>
	</form>

	{#if errorText !== ''}
		<p class="error">{errorText}</p>
	{/if}
{/if}

{#if socket && room !== ''}
	<p class="code">Room <strong>{room}</strong> — share this code to draw together</p>
	<SharedCanvas socket={socket} room={room} />
{/if}

<style>
	.error {
		color: #b00020;
	}
	.code {
		font-size: 1.25rem;
	}
</style>
