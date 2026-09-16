<!--
  Example 3 — Multiple pieces of state, interacting

  Two independent $state values, plus a plain computed expression
  in the markup ({width * height}). We are NOT introducing $derived
  yet — this shows you can go a long way with $state alone and inline
  expressions before you need anything fancier.
-->
<script>
  let width = $state(4);
  let height = $state(3);

  function growWidth() {
    width += 1;
  }
  function growHeight() {
    height += 1;
  }
</script>

<div class="example">
  <h3>3. Multiple state values</h3>
  <p>Width: {width} · Height: {height}</p>
  <p>Area: {width * height}</p>
  <button onclick={growWidth}>Grow width</button>
  <button onclick={growHeight}>Grow height</button>

  <!-- A visual so the reactivity is obvious, not just numbers changing -->
  <div
    class="rect"
    style="width: {width * 20}px; height: {height * 20}px;"
  ></div>
</div>
