// lab-relay.js — Track 1 LAB starter: the server speaks first.
//
// ============================================================================
// LAB: a live "people here" count
// ----------------------------------------------------------------------------
// Until now, every message the relay sent was one it had just RECEIVED.
// In this lab the relay sends a message nobody asked for: whenever someone
// joins or leaves, it tells everyone how many people are connected.
//
// Steps
//   1. Fill in sendCountToEveryone() below (TODO 1). It should build this object:
//          { type: 'count', count: <number of open connections> }
//      turn it into text with JSON.stringify(...), and send it to every open
//      connection, using the same loop as the 'message' handler.
//   2. Call sendCountToEveryone() when someone connects (TODO 2).
//   3. Call sendCountToEveryone() when someone leaves (TODO 3).
//   4. Finish the browser side in 20-sveltekit-realtime-chat, src/routes/lab/+page.svelte.
//
// Tip: wss.clients.size is the number of connections currently open.
//      (wss.clients is a Set, a list with no duplicates; .size is its length.)
//
// Run it with: npm run lab   (stop the plain relay first, they share port 3002)
//
// A correct result: open the lab page in three windows and the count reads 3
// in all of them. Close one and the other two change to 2 straight away.
//
// STRETCH: also send { type: 'chat', name: 'Relay', text: 'Someone joined' }
// when someone connects, so it appears in everyone's chat.
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

// TODO 1: tell every open connection how many people are here.
function sendCountToEveryone() {
	// Build the message object, e.g. { type: 'count', count: ... }

	// Turn it into text with JSON.stringify(...)

	// Loop over wss.clients and send the text to each OPEN client
}

wss.on('connection', (ws) => {
	console.log('Someone connected. People connected: ' + wss.clients.size);

	// TODO 2: someone just joined, so tell everyone the new count.

	ws.on('message', (data) => {
		const text = data.toString();
		for (const client of wss.clients) {
			if (client.readyState === WebSocket.OPEN) {
				client.send(text);
			}
		}
	});

	ws.on('close', () => {
		console.log('Someone left. People connected: ' + wss.clients.size);

		// TODO 3: someone just left, so tell everyone the new count.
		// (By the time this runs, the connection that closed has already been
		// removed from wss.clients, so the size is already correct.)
	});
});

server.listen(PORT, '0.0.0.0', () => {
	console.log('LAB relay listening on port ' + PORT);
});
