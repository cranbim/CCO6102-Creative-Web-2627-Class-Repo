// test-relay.js — check a ROOMS relay is working, locally or on the internet.
//
// Usage:
//   node test-relay.js                                  (tests ws://localhost:3002)
//   node test-relay.js wss://your-relay.onrender.com    (tests a public relay)
//
// What it does: it plays four pretend browsers, A, B, C and D.
//   1. A creates a room and should get a 4-digit code back.
//   2. B joins A's room with that code.
//   3. C tries to join room 0000, which nobody created, and should get an error.
//   4. A sends a stroke. B should receive it; A (the sender) should not.
//   5. D creates its own room, then sends a stroke pretending to be for A's room.
//      A relay that checks rooms properly will NOT pass it on to B.
//
// The 'ws' package works as a WebSocket CLIENT in Node, as well as a server,
// which is why this script can pretend to be a browser. (In a real browser
// we use the browser's own WebSocket instead.)

import { WebSocket } from 'ws';

// process.argv is the list of words typed on the command line:
// [ 'node', 'test-relay.js', 'wss://...' ]. The third one, if present, is our address.
let address = 'ws://localhost:3002';
if (process.argv.length > 2) {
	address = process.argv[2];
}
// Addresses copied from a dashboard often end in '/', which would turn
// '/health' into '//health' below, so remove one trailing slash if present.
if (address.endsWith('/')) {
	address = address.slice(0, address.length - 1);
}

let passed = 0;
let failed = 0;

function check(description, ok) {
	if (ok) {
		passed = passed + 1;
		console.log('  PASS  ' + description);
	} else {
		failed = failed + 1;
		console.log('  FAIL  ' + description);
	}
}

// A free hosting service may be asleep. Waking it takes about a minute, and a
// WebSocket that tries to connect while it's waking will usually just fail.
// So for a public (wss://) address we first knock on the plain /health page
// and wait until it answers "ok".
async function wakeUp() {
	if (address.startsWith('ws://localhost')) {
		return;
	}
	// 'wss://name.onrender.com' -> 'https://name.onrender.com/health'
	const healthAddress = address.replace('wss://', 'https://').replace('ws://', 'http://') + '/health';
	console.log('Waking the relay (this can take up to a minute on a free plan): ' + healthAddress);
	// Try once every 5 seconds for up to 2 minutes (24 tries).
	for (let attempt = 1; attempt <= 24; attempt = attempt + 1) {
		try {
			const response = await fetch(healthAddress);
			const body = await response.text();
			if (response.ok && body === 'ok') {
				console.log('Relay is awake.');
				return;
			}
		} catch (error) {
			// Not awake yet; we'll try again below.
		}
		await wait(5000);
	}
	throw new Error('The relay did not wake up. Check the address and the hosting dashboard logs.');
}

// A Promise is JavaScript's "I'll give you an answer later" object; await waits
// for it. This little helper just waits a number of milliseconds.
function wait(milliseconds) {
	return new Promise((resolve) => {
		setTimeout(resolve, milliseconds);
	});
}

// Open one pretend browser. Every message it receives is kept in its own
// 'received' list so we can look at it afterwards.
function openBrowser(name) {
	return new Promise((resolve, reject) => {
		const socket = new WebSocket(address);
		socket.received = [];
		socket.on('message', (data) => {
			socket.received.push(JSON.parse(data.toString()));
		});
		socket.on('open', () => {
			resolve(socket);
		});
		socket.on('error', (error) => {
			reject(new Error(name + ' could not connect to ' + address + ': ' + error.message));
		});
	});
}

function send(socket, messageObject) {
	socket.send(JSON.stringify(messageObject));
}

// Did this pretend browser receive a message of this type?
function findMessage(socket, type) {
	for (const message of socket.received) {
		if (message.type === type) {
			return message;
		}
	}
	return null;
}

async function run() {
	await wakeUp();
	console.log('Testing ' + address);

	const a = await openBrowser('A');
	const b = await openBrowser('B');
	const c = await openBrowser('C');
	const d = await openBrowser('D');
	check('four connections opened', true);

	// 1. A creates a room. We give the relay a moment to reply each time;
	// half a second is plenty locally and on most connections.
	send(a, { type: 'create' });
	await wait(500);
	const joinedA = findMessage(a, 'joined');
	check('A created a room and got a code back', joinedA !== null);
	if (joinedA === null) {
		console.log('Stopping: without a room code the other tests cannot run.');
		finish([a, b, c, d]);
		return;
	}
	const code = joinedA.room;
	check('the code is 4 digits (' + code + ')', code.length === 4 && Number(code) >= 1000);

	// 2. B joins A's room.
	send(b, { type: 'join', room: code });
	await wait(500);
	check('B joined room ' + code, findMessage(b, 'joined') !== null);

	// 3. C tries a room that doesn't exist.
	send(c, { type: 'join', room: '0000' });
	await wait(500);
	check('C was refused room 0000 with an error', findMessage(c, 'error') !== null && findMessage(c, 'joined') === null);

	// 4. A draws.
	send(a, { type: 'stroke', room: code, x: 0.5, y: 0.5, px: 0.4, py: 0.4, colour: '#e63946' });
	await wait(500);
	check('B (same room) received A\'s stroke', findMessage(b, 'stroke') !== null);
	check('A (the sender) did not get its own stroke back', findMessage(a, 'stroke') === null);
	check('C (not in the room) did not receive it', findMessage(c, 'stroke') === null);

	// 5. D makes its own room, then pretends a stroke is for A's room.
	send(d, { type: 'create' });
	await wait(500);
	b.received = [];
	send(d, { type: 'stroke', room: code, x: 0.1, y: 0.1, px: 0.9, py: 0.9, colour: '#000000' });
	await wait(500);
	const spoofGotThrough = findMessage(b, 'stroke') !== null;
	check('a stroke faked for room ' + code + ' by someone in another room was ignored', spoofGotThrough === false);
	if (spoofGotThrough) {
		console.log('        (Expected if you are running rooms-relay.js before the class fix:');
		console.log('         it trusts the room code written in the message.)');
	}

	finish([a, b, c, d]);
}

function finish(sockets) {
	for (const socket of sockets) {
		socket.close();
	}
	console.log('');
	console.log(passed + ' passed, ' + failed + ' failed');
	// process.exitCode = 1 tells the terminal "something failed" without
	// stopping the script mid-way.
	if (failed > 0) {
		process.exitCode = 1;
	}
}

run().catch((error) => {
	console.log('ERROR: ' + error.message);
	process.exitCode = 1;
});
