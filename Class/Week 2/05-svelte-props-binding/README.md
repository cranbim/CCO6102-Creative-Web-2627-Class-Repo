# 05 · Svelte props & binding — atomic examples + lab

Week 2, Track 1. Same project conventions as Week 1's `02-svelte-basics`:
each concept gets its own small component, assembled in order in `App.svelte`.

## Verified against
Node 22.22, Svelte 5.56, Vite 8.2

## Setup
```
npm install
npm run dev
```

## Files (in teaching order)
1. `src/lib/01-ReceivingProps.svelte` — `$props()`, passing data down
2. `src/lib/02-DefaultProps.svelte` — default values when a prop isn't passed
3. `src/lib/03-TextBinding.svelte` — `bind:value` two-way binding
4. `src/lib/04-LabComponent.svelte` — **lab exercise**: students add one more
   prop + one more bound input, following the pattern already shown above.
   Stretch challenge: turn `waveform` into a `<select>` bound with `bind:value`.

## Facilitation notes for Dave
- Live-code examples 1–3 in front of the class; hand out the file with
  example 4 already scaffolded (the TODO comments) for the lab portion.
- The lab deliberately reuses only patterns already demonstrated — the task
  is applying them again solo, not learning anything new.
- `waveform` names in the stretch challenge ("sine", "square", "sawtooth",
  "triangle") are the same oscillator type names Tone.js uses later this
  session — worth pointing that out if a student takes the stretch challenge.
