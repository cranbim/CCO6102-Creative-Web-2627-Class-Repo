<!--
  Example 2 — The same thing, with $state

  Only one line changed from Example 1: `let count = 0` became
  `let count = $state(0)`. That's the whole rune. Now the UI updates
  automatically whenever `count` changes, because Svelte is tracking it.
-->
<script>
  let count = $state(0); // <-- the only change from Example 1

  function increment() {
    count += 1;
  }
</script>

<div class="example">
  <h3>2. Reactive with $state</h3>
  <p>Count: {count}</p>
  <button onclick={increment}>Increment</button>
</div>
