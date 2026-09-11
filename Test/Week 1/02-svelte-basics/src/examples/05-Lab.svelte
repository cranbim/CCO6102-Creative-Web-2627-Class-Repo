<!--
  LAB — Simple counter, extend it

  Starter code: a working counter using $state, styled minimally.
  Your task (see lab-instructions.md for the full brief):

    1. Add a "decrement" button next to the existing "increment" button.
    2. Add a "reset" button that sets the count back to 0.
    3. Stretch: disable the decrement button when count is already 0
       (hint: `disabled={count === 0}` on the <button> element).

  Everything you need for this is already in Examples 1–4 — you're
  just recombining patterns you've already seen, not learning anything new.
-->
<script>
  let count = $state(0);

  function increment() {
    count += 1;
  }

  // TODO: add a decrement() function
  // TODO: add a reset() function
</script>

<div class="example">
  <h3>Lab: extend the counter</h3>
  <p>Count: {count}</p>
  <button onclick={increment}>Increment</button>
  <!-- TODO: add your decrement button here -->
  <!-- TODO: add your reset button here -->
</div>
