<script>
  import OscillatorPatch from "./lib/OscillatorPatch.svelte";
  import StepSequencer from "./lib/StepSequencer.svelte";
</script>

<main>
  <h1>Week 2 · Track 2 — Step Sequencer</h1>
  <p class="intro">
    Builds on the oscillator/ADSR patch: same synthesis idea, now triggered by
    a Svelte-driven step grid on a <code>setInterval</code> clock. Scroll down
    for the sequencer — the oscillator patch above is kept as a reference for
    the same envelope shape, now wrapped inside <code>Tone.Synth</code>.
  </p>

  <!-- <OscillatorPatch /> -->
  <StepSequencer />
</main>

<style>
  main {
    font-family: system-ui, sans-serif;
    text-align: center;
    padding: 1rem;
  }
  .intro {
    max-width: 480px;
    margin: 0 auto 1rem;
    color: #555;
  }
</style>
