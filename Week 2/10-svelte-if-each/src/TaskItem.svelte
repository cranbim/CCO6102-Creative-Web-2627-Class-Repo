<script>
	// TaskItem.svelte
	// Receives one task via props (Week 2 territory) and a callback to toggle
	// it (same "pass a function down as a prop" pattern used for `increment`
	// elsewhere in the module). The new part is the {#if} block below,
	// switching what's shown based on task.done.
	let { task, onToggle } = $props();
</script>

<li class="task" class:done={task.done}>
	{#if task.done}
		<span class="badge">Done</span>
	{:else}
		<button onclick={() => onToggle(task.id)}>Mark done</button>
	{/if}
	<span class="text">{task.text}</span>
</li>

<style>
	.task {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem 0;
		border-bottom: 1px solid #eee;
	}

	.task.done .text {
		text-decoration: line-through;
		color: #888;
	}

	.badge {
		background: #27ae60;
		color: white;
		font-size: 0.75rem;
		padding: 0.2rem 0.5rem;
		border-radius: 999px;
		min-width: 4.5rem;
		text-align: center;
	}

	button {
		min-width: 4.5rem;
	}
</style>
