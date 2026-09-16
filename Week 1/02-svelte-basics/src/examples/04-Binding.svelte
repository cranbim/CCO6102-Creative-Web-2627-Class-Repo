<!--
  Example 4 — Two-way binding with an input

  bind:value connects a form input directly to a $state variable in
  both directions: typing updates the variable, and changing the
  variable elsewhere would update the input. This is the pattern
  you'll use constantly once we start building real UI.
-->
<script>
  let name = $state('');
</script>

<div class="example">
  <h3>4. Binding an input to state</h3>
  <label>
    Your name:
    <input bind:value={name} placeholder="Type here..." />
  </label>
  {#if name}
    <p>Hello, {name}!</p>
  {:else}
    <p>Waiting for you to type something...</p>
  {/if}
</div>
