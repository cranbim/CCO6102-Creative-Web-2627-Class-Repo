<script>
  // ── Svelte + Tone.js: oscillator with an ADSR envelope ───────────
  //
  // Layering: Tone.Synth is a single Oscillator routed through an
  // AmplitudeEnvelope. Instead of using Tone.Synth directly, we build
  // an Oscillator + AmplitudeEnvelope pair ourselves — a little more
  // typing, but it makes the ADSR stages visible as their own object,
  // which is the whole point of today's demo.
  //
  // All the controls below are just this week's binding patterns
  // (bind:value on <input type="range">) wired to $state — nothing
  // Tone.js-specific about the UI layer at all. Tone.js only comes in
  // where we actually make sound.

  import { onMount, onDestroy } from "svelte";
  import * as Tone from "tone";

  let frequency = $state(220); // Hz
  let attack = $state(0.05); // seconds
  let decay = $state(0.2);
  let sustain = $state(0.5); // 0–1 (not a time — a level)
  let release = $state(0.8); // seconds

  let started = $state(false);

  /** @type {Tone.Oscillator} */
  let osc;
  /** @type {Tone.AmplitudeEnvelope} */
  let envelope;

  onMount(() => {
    envelope = new Tone.AmplitudeEnvelope({
      attack,
      decay,
      sustain,
      release,
    }).toDestination();

    osc = new Tone.Oscillator(frequency, "sine").connect(envelope).start();
  });

  onDestroy(() => {
    osc?.dispose();
    envelope?.dispose();
  });

  // Keep the live Tone.js nodes in sync whenever the bound sliders change.
  // This is a plain Svelte $effect — the same "run this when dependencies
  // change" idea as anywhere else, just pointed at Tone.js objects instead
  // of the DOM.
  $effect(() => {
    if (osc) osc.frequency.value = frequency;
  });
  $effect(() => {
    if (envelope) {
      envelope.attack = attack;
      envelope.decay = decay;
      envelope.sustain = sustain;
      envelope.release = release;
    }
  });

  async function playNote() {
    // Browsers block audio until a user gesture starts the AudioContext —
    // Tone.start() does that. Cheap to call every time; it's a no-op once
    // the context is already running.
    await Tone.start();
    envelope.triggerAttack();
    started = true;
  }

  function releaseNote() {
    envelope.triggerRelease();
    started = false;
  }
</script>

<div class="patch">
  <h3>Oscillator + ADSR envelope</h3>

  <label>
    Frequency: {frequency} Hz
    <input type="range" min="80" max="880" step="1" bind:value={frequency} />
  </label>

  <fieldset>
    <legend>Envelope (ADSR)</legend>

    <label>
      Attack: {attack.toFixed(2)}s
      <input type="range" min="0.01" max="1" step="0.01" bind:value={attack} />
    </label>

    <label>
      Decay: {decay.toFixed(2)}s
      <input type="range" min="0.01" max="1" step="0.01" bind:value={decay} />
    </label>

    <label>
      Sustain: {sustain.toFixed(2)}
      <input type="range" min="0" max="1" step="0.01" bind:value={sustain} />
    </label>

    <label>
      Release: {release.toFixed(2)}s
      <input type="range" min="0.01" max="2" step="0.01" bind:value={release} />
    </label>
  </fieldset>

  <button onmousedown={playNote} onmouseup={releaseNote} onmouseleave={() => started && releaseNote()}>
    {started ? "Release (or let go)" : "Press & hold to play"}
  </button>

  <p class="note">
    Press and hold: you'll hear the attack/decay settle to the sustain level,
    then release fade out when you let go — the four ADSR stages happening
    live. Try dragging Attack most of the way up while holding the button.
  </p>
</div>

<style>
  .patch {
    max-width: 420px;
    margin: 2rem auto;
    padding: 1.25rem 1.5rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-family: system-ui, sans-serif;
  }
  label {
    display: block;
    margin: 0.5rem 0;
    font-size: 0.95rem;
  }
  input[type="range"] {
    width: 100%;
  }
  fieldset {
    border: 1px solid #eee;
    border-radius: 6px;
    margin: 1rem 0;
  }
  button {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    margin-top: 0.75rem;
    cursor: pointer;
  }
  .note {
    font-size: 0.9rem;
    color: #555;
    margin-top: 1rem;
  }
</style>
