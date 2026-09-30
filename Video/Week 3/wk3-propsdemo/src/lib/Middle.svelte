<script>
    import Deep from './Deep.svelte'
    let {count, increment, reset} = $props();
</script>

<div>
    <h4>This is the middle component, which does not even use the props</h4>
    <Deep {count} {increment} {reset}/>
</div>