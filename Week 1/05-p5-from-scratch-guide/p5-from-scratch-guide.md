# Building p5 into a Svelte project from scratch

*Creative Web — Week 1, Track 2, post-study (~20 minutes)*

The in-class demo (`03-svelte-p5-demo`) was handed to you already
built, on purpose — so class time went on *using* p5 reactively,
rather than on setup plumbing. This guide closes that gap. You're
going to build the same pattern yourself, from an empty project, with
one control instead of three. Nothing here is new — it's the exact
same three ingredients as the demo, just typed out by you this time.

By the end you'll have a slider that changes the size of a circle on
a p5 canvas, inside a Svelte component, with zero copy-pasted files.

---

## Step 1 — A fresh Svelte project

```
npm create vite@latest my-p5-practice -- --template svelte
cd my-p5-practice
npm install
```

Check it runs before changing anything:
```
npm run dev
```
You should see the default Vite + Svelte counter demo at
http://localhost:5173. If that's working, delete the noise so you're
starting from a clean slate:

- Delete `src/assets/`, `src/lib/Counter.svelte`, `src/lib/` if empty
  afterwards, `public/vite.svg`.
- Empty out `src/App.svelte` — replace its whole contents with just:
  ```svelte
  <h1>p5 practice</h1>
  ```
- Confirm it still runs and shows just that heading before continuing.

## Step 2 — Install p5

```
npm install p5
```

That's it — no config file, no build plugin. p5 is just a JavaScript
library like any other npm package at this point.

## Step 3 — Write the wrapper component

This is the one piece of "p5-specific plumbing" in the whole exercise.
Create `src/lib/P5Canvas.svelte`:

```svelte
<script>
  import p5 from 'p5';
  import { onMount, onDestroy } from 'svelte';

  let { sketch } = $props();

  let container;
  let p5Instance;

  onMount(() => {
    p5Instance = new p5(sketch, container);
  });

  onDestroy(() => {
    p5Instance?.remove();
  });
</script>

<div bind:this={container}></div>
```

**Type this out rather than copy-pasting it**, and as you type, say
(out loud or in your head) what each part is doing:
- `import p5 from 'p5'` — nothing magic, just importing the library.
- `let { sketch } = $props()` — this is called **destructuring**.
  `$props()` hands the component a plain object of whatever the parent
  passed in — here, `{ sketch: <the function> }`. Rather than writing
  `let props = $props(); let sketch = props.sketch;` on two lines,
  destructuring pulls `sketch` straight out in one line. Same result,
  shorter.
- `onMount` — runs once, after Svelte has put the `<div>` on the page.
  We create the p5 instance here, and tell it to attach itself inside
  `container` rather than taking over the whole page.
- `onDestroy` — runs if this component is ever removed from the page.
  We tell p5 to clean up its canvas so it doesn't keep running in the
  background. Notice the `?.` in `p5Instance?.remove()` — this is
  **optional chaining**. Without it, `p5Instance.remove()` would throw
  an error if `p5Instance` somehow didn't exist yet. The `?.` says
  "only call `.remove()` if `p5Instance` actually has a value —
  otherwise, do nothing." A one-character safety check instead of
  writing `if (p5Instance) { p5Instance.remove(); }`.
- `bind:this={container}` — this is how a Svelte component gets a
  direct reference to one of its own DOM elements, so we can hand that
  element to p5 in `onMount`.

## Step 4 — Write a sketch and one control

Now replace `src/App.svelte`:

```svelte
<script>
  import P5Canvas from './lib/P5Canvas.svelte';

  let circleSize = $state(80);

  function sketch(p) {
    p.setup = () => {
      p.createCanvas(400, 300);
    };

    p.draw = () => {
      p.background(220);
      p.circle(200, 150, circleSize);
    };
  }
</script>

<main>
  <h1>p5 practice</h1>
  <label>
    Size
    <input type="range" min="20" max="200" bind:value={circleSize} />
    {circleSize}
  </label>
  <P5Canvas {sketch} />
</main>
```

Run it:
```
npm run dev
```
Drag the slider. The circle should resize live.

## Step 5 — Notice what you didn't have to do

You didn't write any code that says "when the slider changes, update
the canvas." You declared `circleSize` with `$state`, bound a slider
to it, and read the same variable inside `p.draw()`. `draw()` runs
about 60 times a second on its own, and each time it runs, it just
reads whatever `circleSize` currently is.

This is the whole idea behind the in-class demo — it just had three
sliders (size, speed, hue) instead of one, following exactly this
pattern three times over.

## If something doesn't work

- **Blank page, no canvas at all** — check the browser console
  (right-click → Inspect → Console) for an error. The most common
  cause at this stage is a typo in the import path
  (`./lib/P5Canvas.svelte`).
- **Slider does nothing** — check you're reading the *same* variable
  name inside `draw()` that your `bind:value` is attached to. This is
  the single most common mistake in this whole exercise.
- **Canvas appears but never updates** — check `p.draw = () => {...}`
  is assigned inside `p.setup`'s sibling, not nested inside `setup`
  itself. `setup` and `draw` are both properties you set on `p`, at
  the same level.

## Stretch (optional)

Add a second slider (e.g. controlling background brightness via
`p.background(circleSize % 255)`, or a second shape property) using
the exact same three-step pattern from Step 4. If you can do that
without looking back at this guide, you've got the pattern.
