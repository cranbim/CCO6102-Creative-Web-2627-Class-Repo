<script>
  // ── Svelte + Tone.js: a simple step sequencer ────────────────────
  //
  // Two clearly separate jobs in this file:
  //
  //   1. UI STATE (Svelte) — an 8-step $state array of booleans, toggled
  //      by clicking the grid. This is exactly the same $state +
  //      bind/onclick pattern from Track 1 today, just applied to an
  //      array instead of a single value.
  //
  //   2. PLAYBACK TIMING (setInterval) — a plain JS interval walks
  //      through the steps and triggers the synth for any step that's
  //      "on". This is the setInterval pattern students already know
  //      from earlier modules — nothing new to learn here.
  //
  // ⚠️ A NOTE ON TIMING
  // setInterval runs on the browser's main JS event loop, not the audio
  // clock — if the browser is busy (a re-render, a garbage collection
  // pause, another tab hogging the CPU), a tick can fire a few
  // milliseconds late. At this tempo, for a simple on-screen sequencer,
  // that's not audible. But it WILL drift audibly if you push the tempo
  // up, add more steps, or need multiple instruments to stay locked
  // together — at that point you want Tone.js's own scheduler instead:
  //   - Tone.Transport.scheduleRepeat(...)
  //   - Tone.Sequence(...)
  // Both schedule against the Web Audio clock directly, which is what
  // makes them sample-accurate. See the post-study challenge task.

  import { onMount, onDestroy } from "svelte";
  import * as Tone from "tone";

  const STEP_COUNT = 8;

  let steps = $state(Array(STEP_COUNT).fill(false));
  let currentStep = $state(0);
  let playing = $state(false);
  let bpm = $state(120);

  /** @type {Tone.Synth} */
  let synth;
  /** @type {ReturnType<typeof setInterval> | null} */
  let intervalId = null;

  onMount(() => {
    synth = new Tone.Synth({
      envelope: { attack: 0.005, decay: 0.1, sustain: 0.1, release: 0.2 },
    }).toDestination();
  });

  onDestroy(() => {
    stop();
    synth?.dispose();
  });

  function msPerStep() {
    // 16th notes: one quarter note = 60000/bpm ms; a 16th is a quarter of that.
    return 60000 / bpm / 4;
  }

  function tick() {
    if (steps[currentStep]) {
      synth.triggerAttackRelease("C4", "16n");
    }
    currentStep = (currentStep + 1) % STEP_COUNT;
  }

  async function toggle() {
    if (playing) {
      stop();
      return;
    }
    await Tone.start(); // unlock audio on user gesture
    playing = true;
    currentStep = 0;
    intervalId = setInterval(tick, msPerStep());
  }

  function stop() {
    playing = false;
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function toggleStep(i) {
    steps[i] = !steps[i];
  }

  // If bpm changes while playing, restart the interval at the new speed.
  $effect(() => {
    bpm;
    if (playing && intervalId !== null) {
      clearInterval(intervalId);
      intervalId = setInterval(tick, msPerStep());
    }
  });
</script>

<div class="sequencer">
  <h3>Step sequencer</h3>

  <div class="grid">
    {#each steps as on, i}
      <button
        class="step"
        class:on
        class:playhead={playing && currentStep === i}
        onclick={() => toggleStep(i)}
        aria-pressed={on}
      >
        {i + 1}
      </button>
    {/each}
  </div>

  <label>
    Tempo: {bpm} BPM
    <input type="range" min="60" max="200" bind:value={bpm} />
  </label>

  <button class="transport" onclick={toggle}>
    {playing ? "Stop" : "Play"}
  </button>

  <p class="note">
    Click steps to toggle them on/off, then press Play. Try a fast tempo (180+)
    to feel where <code>setInterval</code> starts to feel a little loose —
    that's the drift mentioned above.
  </p>
</div>

<style>
  .sequencer {
    max-width: 420px;
    margin: 2rem auto;
    padding: 1.25rem 1.5rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-family: system-ui, sans-serif;
    text-align: center;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 0.4rem;
    margin: 1rem 0;
  }
  .step {
    aspect-ratio: 1;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #f4f4f4;
    cursor: pointer;
    font-size: 0.8rem;
  }
  .step.on {
    background: #548235;
    color: white;
  }
  .step.playhead {
    outline: 3px solid #833c0c;
    outline-offset: 1px;
  }
  label {
    display: block;
    margin: 0.75rem 0;
  }
  input[type="range"] {
    width: 100%;
  }
  .transport {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    cursor: pointer;
  }
  .note {
    font-size: 0.9rem;
    color: #555;
    margin-top: 1rem;
    text-align: left;
  }
</style>
