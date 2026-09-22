<script>
  // ── Receiving props ──────────────────────────────────────────────
  // A prop is just a value the PARENT passes down to this component.
  // In Svelte 5 we declare which props we expect using the $props() rune,
  // then destructure the names we want — same destructuring syntax as
  // any other JS object.
  
  // let { name, favouriteColour } = $props();
</script>

<div class="demo">
  <h3>01 — Receiving props</h3>
  <p>
    Hello, <strong>{name}</strong>! Your favourite colour is
    <strong style="color: {favouriteColour}">{favouriteColour}</strong>.
  </p>
  <p class="note">
    This component didn't invent "name" or "favouriteColour" — the parent
    (<code>App.svelte</code>) passed them in as attributes, the same way you'd
    pass attributes to a plain HTML element like <code>&lt;img src="..." /&gt;</code>.
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
