<script>
  import OscillatorPatch from "./lib/OscillatorPatch.svelte";
</script>

<main>
  <h1>Week 2 · Track 2 — Tone.js Oscillator + ADSR</h1>
  <p class="intro">
    A minimal Svelte + Tone.js patch: an <code>Oscillator</code> routed through
    an <code>AmplitudeEnvelope</code>, controlled entirely with the binding
    patterns from Track 1 this session.
  </p>

  <OscillatorPatch />
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
