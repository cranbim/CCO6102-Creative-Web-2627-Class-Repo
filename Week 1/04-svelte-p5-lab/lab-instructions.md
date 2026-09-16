# Track 2 Lab — Wire DOM controls to a p5 sketch

## Starting point

`src/App.svelte` already has ONE working control: a slider that
changes the size of a circle. Run the project (`npm install && npm run
dev`) and confirm you can see the slider changing the circle before
you touch anything.

## The pattern (same every time)

1. Declare a `$state` variable.
2. Bind a DOM control to it (`bind:value`, `bind:checked`, an
   `onclick` handler that flips a boolean — whatever fits).
3. Read that *same* variable inside the `p.draw = () => {...}`
   function in `sketch()`.

That's the whole pattern. There's no fourth step. If a control isn't
affecting the sketch, the most common cause is reading a different
variable name in `draw()` than the one your control is bound to.

## Suggested starting points — pick at least one

You don't need to do all of these. Pick whichever sounds most fun,
and treat the rest as options if you want to keep going.

- **Number of shapes.** Add a slider for a count (e.g. 1–20), and use
  a `for` loop in `draw()` to draw that many circles instead of one
  (e.g. spaced out along the canvas width, or scattered randomly).
- **Shape type.** Add a couple of buttons ("Circle" / "Square") that
  set a `shapeType` string variable, and use an `if` inside `draw()`
  to call `p.circle(...)` or `p.square(...)` depending on its value.
- **Background colour.** Add an `<input type="color">` bound to a
  `bgColor` variable, and pass it into `p.background(bgColor)`
  (p5 accepts CSS hex colour strings directly).
- **Spin/motion toggle.** Add a checkbox bound to a boolean
  `isSpinning`, and use it to conditionally rotate something in
  `draw()` (look up `p.push()` / `p.rotate()` / `p.pop()` in the p5
  reference if you want rotation without affecting everything else
  drawn afterwards).

## Invitation to creative play

Once you've got one of the above working, don't stop there if you're
enjoying it — this is meant to be an open sandbox, not a fixed spec.
Try combining two ideas, try an input type we haven't suggested
(`range`, `color`, `checkbox`, and plain buttons are all fair game),
or try mapping a control to something unexpected (what if a slider
controlled *speed* instead of *size*?).

## Reflection (bring to the group discussion)

- What felt easy about wiring DOM to canvas this way?
- What would start to feel awkward if you had many controls, or if
  the controls lived in a different component to the canvas?
  (Keep this thought — we'll come back to it in Week 3.)

**Estimated time:** 45–60 minutes, including the reflection.
