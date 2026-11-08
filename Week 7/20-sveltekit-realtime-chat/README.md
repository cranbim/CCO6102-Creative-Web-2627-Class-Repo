# 20-sveltekit-realtime-chat

Week 7, Track 1. A chat page that stays connected to a relay with a WebSocket, so messages appear in every open window immediately, with no reloading and no asking.

## Set up

No `.env` file this week. You need **two terminals**:

```bash
# Terminal 1: the relay
cd 19-express-ws-relay
npm install
npm start

# Terminal 2: this project
cd 20-sveltekit-realtime-chat
npm install
npm run dev
```

Open http://localhost:5173/live in two or more browser windows side by side, and chat.

## How this project was made

```bash
npx sv create 20-sveltekit-realtime-chat --template minimal --no-types --no-add-ons --install npm
```

- `--template minimal`: an almost empty project.
- `--no-types`: plain JavaScript, no TypeScript.
- `--no-add-ons`: nothing extra (no Tailwind, no testing tools).
- `--install npm`: run `npm install` straight away.

After that, the only change to the setup was `"checkJs": false` in `jsconfig.json` (as in Weeks 5–6), so the editor doesn't type-check our plain JavaScript. No packages were added: browsers have WebSocket built in.

## Routes

| Route | File | What it shows |
|---|---|---|
| `/` | `src/routes/+page.svelte` | How to run everything |
| `/live` | `src/routes/live/+page.svelte` | The demo: a live chat over a WebSocket |
| `/lab` | `src/routes/lab/+page.svelte` | Lab starter: the chat plus a "people here" count |

`src/lib/relay.js` holds the relay's address (`ws://localhost:3002`) in one place, so moving the relay to the internet means changing one line.

## The lab

| Step | Where | What to do |
|---|---|---|
| 1 | `19-express-ws-relay/lab-relay.js` | Make the relay send `{ type: 'count', count: ... }` to everyone when someone joins or leaves. Run it with `npm run lab` |
| 2 | `src/routes/lab/+page.svelte` | In the `message` listener, when `message.type` is `'count'`, set `peopleHere` |

A correct result: three windows say "People here: 3"; close one and the other two say 2.

## Looking at the messages

Open DevTools (F12) → **Network** → click the row for the WebSocket connection (`localhost:3002`) → **Messages**. Every message sent and received is listed as the JSON text it really is. Compare this with an ordinary `fetch` in Weeks 4–6: there, each request is a new row; here, one row stays open and the messages flow inside it.

## What we left out (on purpose)

- **Reconnecting**: if the relay stops, the page says "Disconnected" and you reload.
- **Message history**: you only see messages sent while your page is open.
- **Identity**: anyone can type any name. (Track 2 and Week 8 come back to this.)
- **A public relay**: everything here runs on your own laptop. See the public relay recipe for putting a relay on the internet.

## Further reading

- MDN, Writing WebSocket client applications: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications
- Chrome DevTools, analysing WebSocket messages: https://developer.chrome.com/docs/devtools/network/reference
- javascript.info, WebSocket: https://javascript.info/websocket

## Verification notes

Run on 3 Nov 2026 with SvelteKit 3.1.1, Svelte 5.57 and Vite 8.3, against `19-express-ws-relay` on localhost:

- `npm run build`: clean. `svelte-check`: 0 errors, 0 warnings.
- Playwright (Chromium), three separate browser windows on `/live`: all three show "Connected"; a message from window A (sent with the button) and from window B (sent with Enter) appear in all three windows; no page errors.
- `/lab` starter with the tutor's solved relay: the count stays at 0 (browser side not done yet), as expected. Tutor page with the solved relay: all three show 3; after one window closes, the others show 2.
- With the relay stopped, the page shows "Disconnected. Is the relay running?…", and trying to send shows "Not connected yet, so nothing was sent." instead of throwing an error.

**Not run here:** the interactive (prompt-by-prompt) version of `sv create`. The flags above were used instead.
