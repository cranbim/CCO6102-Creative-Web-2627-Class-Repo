<!--
  CHALLENGE — Step counter with a custom step size

  This one asks you to combine TWO pieces of state that affect each
  other, similar to Example 3, but you're building the interaction
  yourself this time. See lab-instructions.md for the full brief.
-->
<script>
  let count = $state(0);
  let step = $state(1);

  // TODO: write an increment() function that adds `step` to `count`
  //       instead of always adding 1.
  // TODO: add an <input type="number" bind:value={step}> so the user
  //       can change the step size.
  // STRETCH: what happens if step is 0 or negative? Is that OK, or
  //          should you guard against it?
</script>

<div class="example">
  <h3>Challenge: step counter</h3>
  <p>Count: {count} (step size: {step})</p>
  <!-- TODO: your increment button and step-size input go here -->
</div>
