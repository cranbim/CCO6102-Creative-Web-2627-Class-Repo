<script>
    import {counter, increment} from '../shared/sharedState.svelte.js'
    // let {count, increment} =$props()
</script>

<div>
    <h3>This is the Deep Component</h3>
    <p>The value of count is {counter.count}</p>
    <button onclick={increment}>Increment</button>
</div>