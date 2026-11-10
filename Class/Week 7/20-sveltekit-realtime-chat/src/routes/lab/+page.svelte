<script>
	// lab/+page.svelte — Track 1 LAB starter: the live chat, plus a "people here" count.
	//
	// ==========================================================================
	// LAB (browser side) — do the relay side first, in 19-express-ws-relay/lab-relay.js
	// --------------------------------------------------------------------------
	// The lab relay sends a new kind of message whenever someone joins or leaves:
	//     { type: 'count', count: 3 }
	// Nobody asked for it: the server is speaking first.
	//
	// Steps
	//   1. In the 'message' listener below (TODO), add a second if-statement:
	//      when message.type is 'count', set peopleHere to message.count.
	//   2. Save. The page reloads by itself; the count appears under the heading.
	//
	// A correct result: three windows all say "People here: 3"; close one and the
	// other two say 2.
	//
	// STRETCH: if you did the relay stretch ('Someone joined' chat messages), they
	// already appear in the chat with no browser changes. Why?
	// ==========================================================================

	import { onMount, onDestroy } from 'svelte';
	import { RELAY_URL } from '#lib/relay.js';

	// Every chat message we've received, oldest first. Each one looks like:
	//   { type: 'chat', name: 'Sam', text: 'hello' }
	let messages = $state([]);

	// What the person has typed into the two boxes.
	let name = $state('');
	let text = $state('');

	// Shown at the top of the page, so you can tell at a glance if the relay is up.
	let status = $state('Connecting...');

	// How many people the relay says are connected. 0 until it tells us.
	let peopleHere = $state(0);

	// The open line to the relay. A plain variable, not $state: nothing on the
	// page displays the socket itself, we only use it in our functions.
	let socket;

	// onMount runs once, in the browser, after the page appears. WebSocket only
	// exists in the browser, so we must not create it at the top level of the
	// script (that also runs on the server, during server rendering).
	onMount(() => {
		// This one line opens the connection: the browser sends the HTTP
		// "Upgrade" request and, if the relay agrees, the line stays open.
		socket = new WebSocket(RELAY_URL);

		// addEventListener(eventName, function) means "when this happens, run this".
		// A socket has four events: open, message, error and close.
		socket.addEventListener('open', () => {
			status = 'Connected';
		});

		socket.addEventListener('close', () => {
			status = 'Disconnected. Is the relay running? Reload the page to try again.';
		});

		// 'message' runs every time the relay sends us something. The text is in
		// event.data; JSON.parse turns it back into an object.
		socket.addEventListener('message', (event) => {
			const message = JSON.parse(event.data);
			// The relay passes on everything, so only keep the chat messages.
			if (message.type === 'chat') {
				// $state arrays are reactive, so push() updates the {#each} below.
				messages.push(message);
			}
	
			// TODO: when message.type is 'count', update peopleHere.
		});
	});

	// Close the line when we leave the page, so the relay knows we've gone.
	// onDestroy also runs during server rendering, where there is no socket,
	// hence the check.
	onDestroy(() => {
		if (socket) {
			socket.close();
		}
	});

	function sendMessage(event) {
		// Stop the browser's normal form behaviour (reloading the page).
		event.preventDefault();

		if (text === '') {
			return;
		}
		// WebSocket.OPEN means "connected and ready". Sending on a socket that is
		// still connecting, or has closed, would throw an error.
		if (socket.readyState !== WebSocket.OPEN) {
			status = 'Not connected yet, so nothing was sent.';
			return;
		}

		let senderName = name;
		if (senderName === '') {
			senderName = 'Anonymous';
		}

		// A socket sends text, so we turn our object into JSON text first.
		// Notice we don't add the message to our own list here: the relay sends
		// it back to us along with everyone else, and the 'message' listener adds it.
		const message = { type: 'chat', name: senderName, text: text };
		socket.send(JSON.stringify(message));

		text = '';
	}
</script>

<h1>Live chat — lab</h1>
<p class="status">{status}</p>
<p><strong>People here: {peopleHere}</strong></p>

<form onsubmit={sendMessage}>
	<input bind:value={name} placeholder="Your name" size="12" />
	<input bind:value={text} placeholder="Say something" size="28" />
	<button>Send</button>
</form>

{#each messages as message}
	<p><strong>{message.name}:</strong> {message.text}</p>
{/each}

<style>
	.status {
		color: #555;
		font-size: 0.9rem;
	}
	form {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}
</style>
