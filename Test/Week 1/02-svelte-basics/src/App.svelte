<!--
  Creative Web — Week 1 — Svelte Basics (Track 1, in-class)

  A simple menu so Dave can click through the atomic examples in order
  during the demo, without switching files on screen. Uses only $state
  and conditional rendering — nothing here is ahead of where students
  are in the syllabus yet (no routing, no stores, no $derived — that
  rune isn't taught until a later week, so this file deliberately
  doesn't reach for it either, even though it would shorten this a
  little).
-->
<script>
  import Static from './examples/01-Static.svelte';
  import Reactive from './examples/02-Reactive.svelte';
  import MultipleState from './examples/03-MultipleState.svelte';
  import Binding from './examples/04-Binding.svelte';
  import Lab from './examples/05-Lab.svelte';
  import Challenge from './examples/06-Challenge.svelte';

  const pages = [
    { id: 'static', label: '1. Static', component: Static },
    { id: 'reactive', label: '2. Reactive ($state)', component: Reactive },
    { id: 'multi', label: '3. Multiple state', component: MultipleState },
    { id: 'binding', label: '4. Binding', component: Binding },
    { id: 'lab', label: 'Lab', component: Lab },
    { id: 'challenge', label: 'Challenge', component: Challenge },
  ];

  let activeId = $state('static');
</script>

<main>
  <h1>Svelte Basics — Week 1</h1>
  <nav>
    {#each pages as page (page.id)}
      <!--
        FIRST ENCOUNTER (reinforcement) — arrow function again, same
        shape as main.js in the vite-starter project: () => { ... }.
        Here it's written even shorter, as () => (activeId = page.id)
        — no curly braces, because the whole function body is just one
        expression (set activeId to this page's id). Still the same
        idea: "a function, to run later, when this button is clicked."
      -->
      <button
        class:active={activeId === page.id}
        onclick={() => (activeId = page.id)}
      >
        {page.label}
      </button>
    {/each}
  </nav>

  {#each pages as page (page.id)}
    {#if page.id === activeId}
      <page.component />
    {/if}
  {/each}
</main>
