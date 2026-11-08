// rooms-relay.js — Track 2 demo AND lab starter: a relay with rooms.
//
// Same switchboard as relay.js, with one big change: people are grouped into
// ROOMS, each with a 4-digit code, the way Jackbox or Kahoot work.
//
// Three kinds of message arrive from the browser:
//   { type: 'create' }                   -> make a new room, put this person in it
//   { type: 'join', room: '4821' }        -> put this person in an existing room
//   { type: 'stroke', room: '4821', ... } -> anything else: pass it on to that room
//
// Two kinds of reply go back:
//   { type: 'joined', room: '4821' }      -> you're in, here's your code
//   { type: 'error', text: '...' }        -> that didn't work, here's why
//
// Run it with: npm run rooms
//
// ============================================================================
// LAB: make the rooms actually work
// ----------------------------------------------------------------------------
// Try it first: window A creates a room, window B joins it, window C creates a
// DIFFERENT room. Draw in C. The stroke appears in A and B too. Then try joining
// room 0000 (which nobody created): the relay says you're in.
//
// Steps
//   1. TODO 1 (in the forwarding loop): only pass a message on to people in the
//      room the message is for. Add one more check to the if-statement.
//      Tip: each connection remembers its room in client.room, and the message
//      says which room it's for in message.room.
//   2. TODO 2 (in the 'join' section): only let someone join a room that
//      exists. Use roomExists(...). If it doesn't exist, reply with
//          { type: 'error', text: 'No room with the code ' + message.room }
//      and don't change ws.room.
//   3. Restart the relay (Ctrl+C, then npm run rooms) and reload your windows.
//
// A correct result: strokes in room C stay in room C; joining 0000 shows
// "No room with the code 0000" on the page.
//
// STRETCH: when someone joins, tell the people already in that room by sending
// them { type: 'hello' }, and make the page show "someone joined".
// ============================================================================

import express from 'express';
import http from 'node:http';
import { WebSocketServer, WebSocket } from 'ws';

const PORT = process.env.PORT || 3002;

const app = express();

app.get('/health', (req, res) => {
	res.send('ok');
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server: server });

// Send one object to one connection, as JSON text.
function sendTo(ws, messageObject) {
	ws.send(JSON.stringify(messageObject));
}

// Is anyone currently in this room? We don't keep a separate list of rooms:
// a room exists as long as at least one open connection has that room code.
// When the last person leaves, the room simply stops existing.
function roomExists(code) {
	for (const client of wss.clients) {
		if (client.room === code) {
			return true;
		}
	}
	return false;
}

// Pick a random code from 1000 to 9999 that nobody is using.
// Math.random() gives a number from 0 up to (not including) 1, so
// 1000 + Math.random() * 9000 lands between 1000 and 9999.999...;
// Math.floor() chops off the decimals. String(...) turns 4821 into '4821',
// because codes travel as text and we compare them as text.
function makeRoomCode() {
	let code = String(Math.floor(1000 + Math.random() * 9000));
	// If that code is taken, keep picking until we find a free one.
	while (roomExists(code)) {
		code = String(Math.floor(1000 + Math.random() * 9000));
	}
	return code;
}

wss.on('connection', (ws) => {
	// We can attach our own information to each connection. 'room' remembers
	// which room this person is in. An empty string means "not in a room yet".
	ws.room = '';
	console.log('Someone connected. People connected: ' + wss.clients.size);

	ws.on('message', (data) => {
		// ws hands us raw bytes; toString() turns them back into the JSON text.
		const text = data.toString();

		// JSON.parse throws an error if the text isn't valid JSON (someone typing
		// rubbish into the console, say). try/catch stops one bad message from
		// crashing the relay for everyone.
		let message;
		try {
			message = JSON.parse(text);
		} catch (error) {
			console.log('Ignored a message that was not JSON: ' + text);
			return;
		}

		if (message.type === 'create') {
			const code = makeRoomCode();
			ws.room = code;
			sendTo(ws, { type: 'joined', room: code });
			console.log('Room ' + code + ' created');
			return;
		}

		if (message.type === 'join') {
			// TODO 2: only do this if the room exists. Otherwise reply with an
			// error message (see the LAB block at the top) and leave ws.room alone.
			ws.room = message.room;
			sendTo(ws, { type: 'joined', room: message.room });
			console.log('Someone joined room ' + message.room);
			return;
		}

		// Anything else (a stroke, a chat line, a reaction...) gets passed on.
		for (const client of wss.clients) {
			// Two checks so far: not the sender (they've already drawn their own
			// stroke), and connected right now.
			// TODO 1: add a third check, so the message only reaches people in
			// the room it's for.
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				client.send(text);
			}
		}
	});

	ws.on('close', () => {
		console.log('Someone left. People connected: ' + wss.clients.size);
	});
});

server.listen(PORT, '0.0.0.0', () => {
	console.log('Rooms relay listening on port ' + PORT);
});
