# 21-svelte-p5-shared-canvas

Week 7, Track 2. A p5 drawing canvas shared over a WebSocket: first everyone on one canvas, then **rooms** with a 4-digit code, the way Jackbox or Kahoot work.

## Set up

No `.env` file this week. You need **two terminals**:

```bash
# Terminal 1: the relay
cd 19-express-ws-relay
npm install
npm start            # plain relay, for /together
# or
npm run rooms        # rooms relay, for /rooms

# Terminal 2: this project
cd 21-svelte-p5-shared-canvas
npm install
npm run dev
```

## How this project was made

```bash
npx sv create 21-svelte-p5-shared-canvas --template minimal --no-types --no-add-ons --install npm
cd 21-svelte-p5-shared-canvas
npm install p5
```

As in Weeks 5–6, `"checkJs": false` was set in `jsconfig.json`. p5 is v2, used in instance mode with a static `import p5 from 'p5'`, as in every p5 demo since Week 1.

## Routes and files

| Route / file | Relay to run | What it shows |
|---|---|---|
| `/together` (`src/routes/together/+page.svelte`) | `npm start` | Everyone on one canvas. The plain Track 1 relay works unchanged, because it never looks inside messages |
| `/rooms` (`src/routes/rooms/+page.svelte`) | `npm run rooms` | Create a room (get a code) or join one (type a code). Every stroke carries the room code |
| `src/lib/SharedCanvas.svelte` | — | The p5 canvas component both pages use: draws your strokes, sends them, draws everyone else's |
| `src/lib/relay.js` | — | The relay's address, in one place |

A stroke message looks like this. Positions are fractions of the canvas (0 to 1), so a laptop and a phone with different canvas sizes line up:

```
{ type: 'stroke', room: '4821', x: 0.52, y: 0.31, px: 0.50, py: 0.30, colour: '#e63946' }
```

## The lab

The Track 2 lab is in the relay, not this project: `19-express-ws-relay/rooms-relay.js`.

| Try this first (before the lab) | What goes wrong | Lab TODO |
|---|---|---|
| Window A creates a room, B joins it, C creates a different room, then C draws | C's strokes appear in A and B too | TODO 1: only forward to the message's room |
| Join room `0000`, which nobody created | The relay says you're in | TODO 2: refuse rooms that don't exist |

A correct result: strokes stay in their own room, and joining 0000 shows "No room with the code 0000".

## Trying it on a phone

A phone can't reach `localhost` on your laptop, and university Wi-Fi usually stops devices seeing each other. To draw from phones, both the relay and this page need to be on the internet. See the public relay recipe.

## What we left out (on purpose)

- **History**: anyone joining late sees a blank canvas. Nothing remembers the drawing (Week 6: that's what a database is for).
- **Leaving a room**: reload the page.
- **Reconnecting**: if the relay stops or restarts, reload.
- **Fewer messages**: every tiny mouse movement is sent (about 60 a second while drawing). Real apps often send fewer.

## Further reading

- p5.js reference, mouseDragged: https://p5js.org/reference/p5/mouseDragged/ and pmouseX: https://p5js.org/reference/p5/pmouseX/
- Excalidraw, how their shared whiteboard's relay and rooms work: https://plus.excalidraw.com/blog/building-excalidraw-p2p-collaboration-feature
- Jackbox, joining with a room code: https://support.jackboxgames.com/hc/en-us/articles/15794759479959-How-do-I-join-a-game

## Verification notes

Run on 3 Nov 2026 with SvelteKit 3.1.1, Svelte 5.57, Vite 8.3 and p5 2.3.4, against `19-express-ws-relay` on localhost:

- `npm run build`: clean, apart from Vite's usual "large chunk" notice, caused by p5's size. `svelte-check`: 0 errors, 0 warnings.
- Playwright (Chromium), separate browser windows with real mouse drags, checking the canvas pixels:
  - `/together` + plain relay: a stroke drawn in A appears in B.
  - `/rooms` + starter `rooms-relay.js`: create and join work, but C's strokes leak into A's room, and joining 0000 "succeeds". This is the lab's starting problem, as designed.
  - `/rooms` + the lab solution: strokes stay in their room, and 0000 shows the error. A stroke faked from the console for another room still gets through: that's the class's live moment.
  - `/rooms` + the checked relay: the faked stroke is ignored too.
  - No page errors in any run.

**Not run here:** real phones or touch screens. Touch should work (p5 calls `mouseDragged` for touch moves, and the canvas has `touch-action: none`), but it has only been tested with a mouse in a desktop browser.
