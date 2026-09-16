<!--
  Example 1 — Static markup, no reactivity

  This is deliberately boring. There is a `let` variable, but nothing
  in Svelte is watching it — it's just plain JavaScript. Click the
  button and NOTHING visibly updates, even though `count` is changing
  behind the scenes.

  Say out loud: "the value is changing, but the UI has no idea."
  That's the gap the next example fixes.
-->
<script>
  let control=$state(0); //to disable the Svelte 4 auto-reactive behaviour
  let count = 0; // plain JS variable — Svelte is not tracking this

  function increment() {
    count += 1;
    console.log('count is now', count); // prove it's changing via devtools
  }
</script>

<div class="example">
  <h3>1. Static markup (no reactivity)</h3>
  <p>Current count shown below will never change on screen:</p>
  <p>Count: {count}</p>
  <button onclick={increment}>Increment (check the console)</button>
</div>
