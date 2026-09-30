# 06 · Svelte + Tone.js — oscillator with an ADSR envelope

Week 2, Track 2. First Tone.js file — introduces the library and the
concept of an ADSR envelope, controlled entirely with today's Track 1
binding patterns.

## Verified against
Node 22.22, Svelte 5.56, Vite 8.2, tone 15.1.22 (npm's current `latest`
at time of writing — sanity-check the installed version before class in
case a newer release has landed by then; nothing here depends on a specific
minor version).

## Setup
```
npm install
npm run dev
```
Click-and-hold the button to hear the attack → decay → sustain, release on
letting go.

## Files
- `src/lib/OscillatorPatch.svelte` — the whole demo. `Tone.Oscillator` routed
  through `Tone.AmplitudeEnvelope`, five sliders (frequency + ADSR) bound with
  the same `bind:value` pattern used in `05-svelte-props-binding`.

## Facilitation notes for Dave
- `Tone.start()` must be called from a real user gesture (click) — browsers
  block audio otherwise. It's called on every `playNote()`, which is
  harmless once the context is already running.
- The `$effect` blocks syncing sliders → Tone.js objects are worth calling
  out explicitly: this is $effect used for a side effect on a non-DOM object,
  not just the DOM-reactivity examples students have seen so far.
- This file's `OscillatorPatch.svelte` is reused as-is inside
  `07-svelte-tone-sequencer` as a reference above the sequencer itself.
