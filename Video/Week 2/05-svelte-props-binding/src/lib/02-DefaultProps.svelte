<script>
  // ── Default values for props ─────────────────────────────────────
  // If the parent doesn't pass a prop at all, we can fall back to a
  // default — same idea as a default parameter in a normal JS function:
  //   function greet(name = 'stranger') { ... }
  let { label = "mySketch", stepCount = 4} = $props();
</script>

<div class="demo">
  <h3>02 — Default prop values</h3>
  <p>
    Sketch: <strong>{label}</strong> — <strong>{stepCount}</strong> steps.
  </p>
  <p class="note">
    Try it: in <code>App.svelte</code>, render this component twice — once
    passing both props, once passing neither. The second copy falls back to
    the defaults above instead of showing <code>undefined</code>.
  </p>
</div>

<style>
  .demo {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem 1.25rem;
    margin-bottom: 1rem;
  }
  .note {
    font-size: 0.9rem;
    color: #555;
  }
</style>
