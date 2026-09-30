# 07 · Svelte + Tone.js — step sequencer (setInterval)

Week 2, Track 2. Builds on `06-svelte-tone-oscillator`. A Svelte `$state`
array drives an 8-step grid; a `setInterval` loop reads that array to trigger
a `Tone.Synth` on each active step.

## Verified against
Node 22.22, Svelte 5.56, Vite 8.2, tone 15.1.22

## Setup
```
npm install
npm run dev
```
Click steps to toggle them, adjust tempo, press Play.

## Files
- `src/lib/StepSequencer.svelte` — the sequencer itself. Read the comment
  block at the top of the `<script>` before class — it explains the
  Svelte-state-vs-setInterval-timing split and is the basis for the spoken
  note in session.
- `src/lib/OscillatorPatch.svelte` — carried over unchanged from
  `06-svelte-tone-oscillator`, shown above the sequencer as a reminder of the
  same envelope shape, now wrapped inside `Tone.Synth` for the sequencer.

## Facilitation notes for Dave
- **Deliberately uses `setInterval`, not `Tone.Transport`/`Tone.Sequence`.**
  This was a considered choice: it ties directly to JS timing patterns
  students already know, and is genuinely good enough at this tempo/scope
  for an on-screen sequencer. Say this explicitly in class — don't let it
  read as an oversight.
- **Say out loud, once, that this drifts.** `setInterval` runs on the main
  JS thread, not the audio clock, so ticks can land a few ms late under load.
  Not audible at this tempo/step-count, but real — the code comment in
  `StepSequencer.svelte` has the fuller explanation.
- **Push tempo up to ~180+ BPM live** if you want to *demonstrate* the drift
  rather than just describe it — it becomes a little audibly loose.
- The post-study challenge (row 26 in the Week 2 tab) invites students to
  swap the `setInterval` loop for `Tone.Transport.scheduleRepeat` or
  `Tone.Sequence` and compare — signposted as optional creative exploration,
  not taught content this week.
