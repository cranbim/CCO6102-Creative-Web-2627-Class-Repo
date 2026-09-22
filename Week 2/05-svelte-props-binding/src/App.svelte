<script>
  import ReceivingProps from "./lib/01-ReceivingProps.svelte";
  import DefaultProps from "./lib/02-DefaultProps.svelte";
  import TextBinding from "./lib/03-TextBinding.svelte";
  import LabComponent from "./lib/04-LabComponent.svelte";
</script>

<main>
  <h1>Week 2 · Track 1 — Props &amp; Binding</h1>
  <p class="intro">
    Four small, incremental examples: components/props, default values, two-way
    binding, then a lab exercise that combines all three. Same project
    structure and conventions as Week 1's <code>02-svelte-basics</code>.
  </p>

  <ReceivingProps name="Ada" favouriteColour="teal" />

  <DefaultProps />
  <!-- try passing label="Kick drum sketch" stepCount={8} here too -->

  <TextBinding />

  <LabComponent synthName="Warm Pad" />
</main>

<style>
  main {
    max-width: 640px;
    margin: 2rem auto;
    padding: 0 1rem;
    font-family: system-ui, sans-serif;
  }
  .intro {
    color: #555;
    margin-bottom: 1.5rem;
  }
</style>
