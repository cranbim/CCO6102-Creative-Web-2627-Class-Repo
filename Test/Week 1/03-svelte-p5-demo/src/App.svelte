<!--
  Creative Web — Week 1 — Svelte + p5 canvas demo (Track 2, in-class)

  Deliberately NO STORE here — just $state in this component, read
  directly inside the p5 draw() loop. This is the simplest possible
  bridge between DOM controls and canvas behaviour, and it's a good
  moment to ask the room: "what would get awkward about this if the
  sliders lived in a different component to the canvas?" — that's the
  seed for the stores conversation in Week 3. Don't answer it yet.

  What's happening:
    - Three sliders control size, speed, and hue via bind:value.
    - The p5 sketch function closes over those same $state variables.
    - p5's draw() runs 60x/second on its own loop and just reads
      whatever the current slider values are — no manual syncing code
      needed, because reading a $state variable always gets you the
      latest value, from anywhere in this file.
-->
<script>
  import P5Canvas from './lib/P5Canvas.svelte';

  let circleSize = $state(80);
  let speed = $state(2);
  let hue = $state(200);

  // Instance-mode p5 sketch. This function is defined once, but the
  // values it reads (circleSize, speed, hue) are read fresh every
  // single frame — that's what makes the sliders "just work".
  function sketch(p) {
    let x = 0;
    let direction = 1;

    p.setup = () => {
      p.createCanvas(500, 300);
      p.colorMode(p.HSB, 360, 100, 100);
      p.noStroke();
      x = p.width / 2;
    };

    p.draw = () => {
      p.background(20);

      x += speed * direction;
      if (x > p.width - circleSize / 2 || x < circleSize / 2) {
        direction *= -1;
      }

      p.fill(hue, 80, 90);
      p.circle(x, p.height / 2, circleSize);
    };
  }
</script>

<main>
  <h1>Svelte + p5 — Week 1 Demo</h1>

  <div class="controls">
    <label>
      Size
      <input type="range" min="20" max="200" bind:value={circleSize} />
      {circleSize}
    </label>
    <label>
      Speed
      <input type="range" min="0" max="10" bind:value={speed} />
      {speed}
    </label>
    <label>
      Hue
      <input type="range" min="0" max="360" bind:value={hue} />
      {hue}
    </label>
  </div>

  <P5Canvas {sketch} />
</main>
