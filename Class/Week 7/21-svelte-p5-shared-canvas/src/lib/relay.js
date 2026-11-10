// relay.js — the ONE place this project says where the relay lives.
//
// Both canvas pages import this, so moving the relay (from your laptop to Render, say)
// means changing one line here and nowhere else.
//
// ws:// is the WebSocket version of http:// (unencrypted, fine on your own laptop).
// wss:// is the WebSocket version of https:// — use it for a public relay, e.g.
//   export const RELAY_URL = 'wss://your-relay-name.onrender.com';
//
// 3002 is the port 19-express-ws-relay listens on locally.
export const RELAY_URL = 'ws://localhost:3002';
