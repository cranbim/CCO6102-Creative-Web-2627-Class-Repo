// Creative Web — Week 1 — Vite Starter (plain JS, no framework)
//
// This is what you get straight out of `npm create vite@latest` (vanilla
// template), trimmed down and commented for the in-class walkthrough.
//
// The point of this file is NOT the code — it's barely doing anything.
// The point is the WORKFLOW: edit this file, save, and watch the browser
// update instantly without a manual refresh. That instant feedback loop
// (Vite's dev server + Hot Module Replacement) is the thing to notice.

import './style.css'

const app = document.querySelector('#app')

app.innerHTML = `
  <h1>Hello, Vite 👋</h1>
  <p>Edit <code>src/main.js</code> and save to see this update live.</p>
  <button id="demo-button" type="button">Click me</button>
  <p id="click-output"></p>
`

// Plain vanilla JS DOM manipulation — no framework doing this for us.
// This is deliberate: next session we'll do the same job in Svelte and
// compare how much of this manual wiring Svelte removes.
let clicks = 0
const button = document.querySelector('#demo-button')
const output = document.querySelector('#click-output')

// FIRST ENCOUNTER — arrow function `() => { ... }`
// You've seen this shape before, even if it wasn't named. It's a function,
// same as `function () { ... }`, just written differently:
//
//   function () { clicks += 1 }      <- a function expression, the "old" way
//   ()       => { clicks += 1 }      <- an arrow function, same thing
//
// Nothing here changes what the code DOES — it's a shorter way to write
// "a function with no name, that runs later." `addEventListener` wants a
// function as its second argument to run whenever the button is clicked;
// this is that function. You'll see this shape constantly from here on,
// including inside Svelte components later today.
button.addEventListener('click', () => {
  clicks += 1
  output.textContent = `Clicked ${clicks} time${clicks === 1 ? '' : 's'}`
})
