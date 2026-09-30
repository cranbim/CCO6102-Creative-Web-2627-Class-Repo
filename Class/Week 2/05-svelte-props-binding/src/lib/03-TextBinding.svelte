<script>
  // ── bind:value — two-way binding ─────────────────────────────────
  // $state() makes this component's OWN internal state reactive.
  // bind:value wires an <input> up to that state in BOTH directions:
  // typing updates `label`, and if `label` changes elsewhere in the
  // component, the input updates too.
  let label = $state("my first synth patch");
</script>

<div class="demo">
  <h3>03 — Binding an input to state</h3>

  <label>
    Patch name:
    <input bind:value={label} />
  </label>

  <p>You typed: <strong>{label}</strong></p>

  <p class="note">
    Without <code>bind:</code>, you'd need an <code>oninput</code> handler
    that reads <code>event.target.value</code> and assigns it yourself —
    that's what <code>bind:value</code> is doing for you under the hood.
  </p>
</div>

<style>
  .demo {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem 1.25rem;
    margin-bottom: 1rem;
  }
  input {
    font-size: 1rem;
    padding: 0.25rem 0.5rem;
    margin-left: 0.5rem;
  }
  .note {
    font-size: 0.9rem;
    color: #555;
  }
</style>
