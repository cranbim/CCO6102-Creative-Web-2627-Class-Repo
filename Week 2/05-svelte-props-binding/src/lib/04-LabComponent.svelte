<script>
  // ── LAB: extend this component ───────────────────────────────────
  // This "patch card" already combines what we've covered today:
  //   - a prop passed in from the parent (`synthName`)
  //   - a default value (`waveform`)
  //   - a bound input (`volume`, via bind:value)
  //
  // YOUR TASK:
  //   1. Add ONE more prop to the destructure below — something else
  //      you'd want to describe about a synth patch (e.g. `octave`,
  //      `filterType`, `notes`). Give it a sensible default.
  //   2. Add ONE more bound <input> in the markup below, wired to a
  //      new piece of $state, the same way `volume` is wired up.
  //   3. Display both new values somewhere in the card.
  //
  // STRETCH CHALLENGE:
  //   Turn `waveform` into a <select> with bind:value, offering a
  //   choice of "sine" / "square" / "sawtooth" / "triangle" — these
  //   are the same waveform names Tone.js uses, which will matter
  //   later this session.

  let { synthName, waveform = "sine" } = $props();
  let volume = $state(50);

  // TODO: add your new $state variable here
</script>

<div class="demo lab">
  <h3>04 — Lab: extend this patch card</h3>

  <p>
    <strong>{synthName}</strong> — waveform: <strong>{waveform}</strong>
  </p>

  <label>
    Volume:
    <input type="range" min="0" max="100" bind:value={volume} />
    {volume}
  </label>

  <!-- TODO: add your new bound input here -->

  <p class="note">
    Everything above uses only what's been covered today: props, a default
    value, and <code>bind:</code>. Nothing new to learn for the task itself —
    just applying it again yourself.
  </p>
</div>

<style>
  .demo {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem 1.25rem;
    margin-bottom: 1rem;
  }
  .lab {
    border-color: #833c0c;
    border-width: 2px;
  }
  label {
    display: block;
    margin-top: 0.5rem;
  }
  .note {
    font-size: 0.9rem;
    color: #555;
  }
</style>
