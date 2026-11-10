# 19-express-ws-relay

Week 7, Tracks 1 and 2. A WebSocket **relay**: a small Express server that keeps a list of everyone connected and passes each message it receives on to the others. Two browser projects use it: `20-sveltekit-realtime-chat` (Track 1) and `21-svelte-p5-shared-canvas` (Track 2).

## Set up

No `.env` file this week: there are no secrets, and the port has a sensible default.

```bash
cd 19-express-ws-relay
npm install
npm start
```

You should see `Relay listening on port 3002`. Open http://localhost:3002/health in a browser: it should say `ok`.

Port 3002 is used so the relay can run next to Week 6's Express API (port 3001). Only one relay can use port 3002 at a time, so stop one (Ctrl+C) before starting another.

## How this project was made

This is a plain Node project, not a SvelteKit one:

```bash
mkdir 19-express-ws-relay
cd 19-express-ws-relay
npm init -y
npm install express ws
```

Then `"type": "module"` was added to `package.json` so we can write `import` like in our SvelteKit projects.

- **express**: the same web server as Week 5. Here it only answers `/health`.
- **ws**: the WebSocket library for Node. It runs the WebSocket server. (Browsers have WebSocket built in, so the browser projects install nothing extra.)

## Files and scripts

| Command | File | What it is | Used with |
|---|---|---|---|
| `npm start` | `relay.js` | Track 1 demo: forwards every message to everyone, including the sender | `20` `/live`, `21` `/together` |
| `npm run lab` | `lab-relay.js` | Track 1 lab starter: add a "people here" count | `20` `/lab` |
| `npm run rooms` | `rooms-relay.js` | Track 2 demo **and** lab starter: create/join rooms with a 4-digit code | `21` `/rooms` |
| `npm run test-relay` | `test-relay.js` | Checks a rooms relay with four pretend browsers (works on a public relay too) | — |

## The labs

| Lab | File | What you change | A correct result |
|---|---|---|---|
| Track 1: the server speaks first | `lab-relay.js` (+ `20`'s `src/routes/lab/+page.svelte`) | Fill in `sendCountToEveryone()` and call it when someone joins and leaves; show the count on the page | Three windows show "People here: 3"; close one and the others show 2 |
| Track 2: make the rooms work | `rooms-relay.js` | TODO 1: only forward to people in the message's room. TODO 2: refuse to join a room that doesn't exist | Strokes stay in their room; joining 0000 shows "No room with the code 0000" |

Each file opens with a LAB comment block with numbered steps, a tip and a STRETCH task.

## Testing a rooms relay

```bash
node test-relay.js                                  # tests ws://localhost:3002
node test-relay.js wss://your-relay.onrender.com    # tests a public relay
```

It prints PASS/FAIL for: creating a room, joining it, being refused room 0000, strokes reaching only the same room, and a faked room code being ignored. Before the lab, `rooms-relay.js` fails three of these, which is the point of the lab.

## What we left out (on purpose)

These matter for a real product, but each would add a new idea to a week that is already all new:

- **Reconnecting** when the connection drops. A dropped page just says "Disconnected" and you reload.
- **Checking where connections come from** (the `Origin` header), so other websites can't connect to your relay.
- **Size and rate limits**: no cap on how big or how frequent messages can be (`ws` has a `maxPayload` option for this).
- **Persistence**: rooms and drawings live only in memory. Restart the relay and they're gone. (Week 6 showed the fix: a database.)
- **Real identity**: a room code proves you were invited, not who you are. Week 8 covers sessions and accounts.
- **Socket.IO**: the popular library built on WebSockets, which adds rooms, reconnecting and fallbacks. A plain browser WebSocket can't talk to a Socket.IO server, so we learn the real thing first.

## Further reading

- ws README (see "Server broadcast"): https://github.com/websockets/ws
- MDN, Writing WebSocket client applications: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications
- javascript.info, WebSocket (the handshake, in plain language): https://javascript.info/websocket
- Socket.IO, "What Socket.IO is not": https://socket.io/docs/v4/#what-socketio-is-not
- OWASP WebSocket Security Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/WebSocket_Security_Cheat_Sheet.html

## Verification notes

Run on 3 Nov 2026 with Node 22.23, Express 5.3.0 and ws 8.22.1, all on one machine (localhost):

- All files pass `node --check`.
- `relay.js`: three Node WebSocket clients, with a chat message from one received by all three (sender included); `/health` returns `ok`.
- `lab-relay.js` (starter): runs and relays chat; sends no count messages, as expected. Tutor solution: counts arrive as 1, 2, 3 on connect and 2 after one client closes. This confirms that `wss.clients.size` is already updated inside the `close` handler.
- `test-relay.js` against the rooms relays: starter `rooms-relay.js` 6 pass / 3 fail (no room filter, no join check, faked room accepted), as designed; lab solution 8 / 1 (faked room still accepted); checked version 9 / 0.
- Playwright (Chromium) with real browser windows and mouse drags, against `21`'s pages: see that project's README.

**Not run here:** a public deployment (Render or Railway): there is no network route to either from this sandbox. The public relay recipe covers that, with the same test script.
