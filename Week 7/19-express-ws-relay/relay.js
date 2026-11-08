// relay.js — Track 1 demo: the smallest useful WebSocket relay.
//
// A relay is a switchboard, not a database. It keeps a list of everyone who is
// connected, and whenever one of them sends a message, it passes that message on
// to all of them. It never looks inside the message, so the same relay works for
// a chat page today and a shared drawing canvas in Track 2.
//
// Run it with: npm start   (then open two or more browser windows on the chat page)

import express from 'express';
import http from 'node:http';
import { WebSocketServer, WebSocket } from 'ws';

// Locally we use port 3002, so this can run next to Week 6's Express API on 3001.
// A hosting service (Render, Railway) tells us which port to use through the
// PORT environment variable, so we use that when it exists.
const PORT = process.env.PORT || 3002;

// The usual Express app, exactly like Week 5. It still answers ordinary HTTP requests.
const app = express();

// A plain HTTP route. Handy to check the server is awake: open
// http://localhost:3002/health in a browser and you should see "ok".
app.get('/health', (req, res) => {
	res.send('ok');
});

// New this week. Until now we let Express start its own server with app.listen().
// Here we create the server ourselves with http.createServer(app), because we
// want to hand the SAME server to the WebSocket library as well. One server,
// one port, two kinds of conversation: HTTP requests and WebSocket connections.
const server = http.createServer(app);

// The WebSocket server from the 'ws' package. It watches our HTTP server for
// requests asking to "Upgrade" to a WebSocket, and accepts them.
const wss = new WebSocketServer({ server: server });

// 'connection' runs once each time a browser opens a WebSocket to us.
// The ws it gives us is that one browser's open line.
wss.on('connection', (ws) => {
	console.log('Someone connected. People connected: ' + wss.clients.size);

	// 'message' runs every time THIS browser sends us something.
	ws.on('message', (data) => {
		// ws hands us raw bytes. toString() turns them back into the text the
		// browser sent (for us, a small JSON string). We don't need to read it:
		// a relay just passes it on.
		const text = data.toString();

		// wss.clients is the list of every connection that is currently open.
		// We send the message to all of them, including the sender, so the
		// sender's page shows its own message the same way everyone else's does.
		for (const client of wss.clients) {
			// readyState tells us whether a connection is usable right now.
			// WebSocket.OPEN means "connected and ready", so we skip any that are
			// still connecting or already closing.
			if (client.readyState === WebSocket.OPEN) {
				client.send(text);
			}
		}
	});

	// 'close' runs when this browser goes away (tab closed, page changed, wifi lost).
	ws.on('close', () => {
		console.log('Someone left. People connected: ' + wss.clients.size);
	});
});

// '0.0.0.0' means "accept connections from any network address", which hosting
// services need. On your own laptop it makes no difference.
server.listen(PORT, '0.0.0.0', () => {
	console.log('Relay listening on port ' + PORT);
	console.log('WebSocket address: ws://localhost:' + PORT);
});
