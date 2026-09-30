<script>
  // import './page.css';
  import Middle from './lib/Middle.svelte'
  let count = $state(0)

  function increment() {
    count +=1
  }

  function reset() {
    count =0
  }
</script>

<div>
  <h1>Hello World</h1>
  

  <h4>This is the Top level page, with props passed to middle</h4>
  <Middle {count} {increment} {reset}/>
</div>