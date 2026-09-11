<!--
  P5Canvas.svelte — a small reusable wrapper around p5's "instance mode"

  Why instance mode, and why hand-rolled (no wrapper library)?
  p5 normally expects to own the whole page (attaching itself to
  `window`). Instance mode avoids that global pollution and lets us
  control exactly when the sketch starts and stops — which matters in
  Svelte, where a component can mount and unmount many times.

  This is intentionally the ONLY p5-specific plumbing in the whole
  demo. Everything else (the sliders, the state) is just Svelte you
  already know from the basics examples. If you want a ready-made
  version of this exact pattern for your own project, the library
  "svelte-p5" (svelte-p5.dev) does something similar with extra
  features — but understanding this file means you're not dependent
  on it.
-->
<script>
  import p5 from 'p5';
  import { onMount, onDestroy } from 'svelte';

  // FIRST ENCOUNTER — destructuring: let { sketch } = $props()
  // $props() hands this component a plain JS object of everything the
  // parent passed in, e.g. { sketch: <the function> }. We could write:
  //   let props = $props();
  //   let sketch = props.sketch;
  // ...but "pull `sketch` straight out of that object as I declare it"
  // is common enough that JS has a shorthand for it:
  //   let { sketch } = $props();
  // Same result, one line instead of two. You'll see this pattern with
  // any object where you only want one or two of its properties.
  let { sketch } = $props();

  let container; // bound to the wrapping <div> below
  let p5Instance;

  onMount(() => {
    p5Instance = new p5(sketch, container);
  });

  onDestroy(() => {
    // FIRST ENCOUNTER — optional chaining: p5Instance?.remove()
    // Without the `?`, this line would be p5Instance.remove() — but if
    // onDestroy somehow ran before onMount ever set p5Instance, that
    // would throw an error ("cannot call remove() on undefined").
    // The `?.` means "only call .remove() if p5Instance actually has a
    // value; otherwise just skip it, no error." A safety check, in
    // one character, instead of writing:
    //   if (p5Instance) { p5Instance.remove(); }
    p5Instance?.remove(); // stops the draw loop and cleans up the canvas
  });
</script>

<div bind:this={container}></div>
