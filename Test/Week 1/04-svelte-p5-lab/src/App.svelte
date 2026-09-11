<!--
  Creative Web — Week 1 — LAB: wire DOM controls to a p5 sketch
  (Track 2, in-class lab)

  This starts from ONE working control (a slider for circle size) so
  you can see the whole DOM-to-sketch pattern end to end before you
  add your own. See lab-instructions.md for the full brief and
  starting-point suggestions — this file only has minimal inline hints.

  The pattern, every time, is the same three steps:
    1. Declare a $state variable.
    2. Bind a DOM control to it (bind:value, bind:checked, onclick...).
    3. Read that same variable inside the p5 draw() function.
  That's it — there's no fourth step. If your control isn't affecting
  the sketch, check you're reading the SAME variable name in draw().
-->
<script>
  import P5Canvas from './lib/P5Canvas.svelte';

  // ---- Working example: size, already wired up ----
  let circleSize = $state(80);

  // ---- Your turn: declare more $state variables below ----
  // Ideas (pick at least one, see lab-instructions.md for more):
  //   let numShapes = $state(1);
  //   let shapeType = $state('circle'); // 'circle' | 'square'
  //   let bgColor = $state('#141414');
  //   let isSpinning = $state(false);

  function sketch(p) {
    p.setup = () => {
      p.createCanvas(500, 300);
      p.noStroke();
    };

    p.draw = () => {
      p.background(20);
      p.fill(255);
      p.circle(p.width / 2, p.height / 2, circleSize);

      // TODO: use your new $state variable(s) here.
      // e.g. draw more than one shape, change background(), change
      // fill() colour, rotate something — whatever you declared above.
    };
  }
</script>

<main>
  <h1>Lab: DOM → p5 sketch</h1>

  <div class="controls">
    <label>
      Size (working example)
      <input type="range" min="20" max="200" bind:value={circleSize} />
      {circleSize}
    </label>

    <!-- TODO: add more controls here, bound to the variables you
         declared above. Copy the pattern of the size slider. -->
  </div>

  <P5Canvas {sketch} />
</main>
