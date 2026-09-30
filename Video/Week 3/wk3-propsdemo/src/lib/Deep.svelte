<script>
    let {count, increment, reset} = $props();
</script>

<div>
    <h4>This is the Deep module which finally uses the props</h4>
    <p>The counter value is {count}</p>
    <button onclick={increment}>increment</button>
    <button onclick={reset}>reset</button>
</div>


