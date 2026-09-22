<script>
	// App.svelte
	import { initialTasks } from './tasks.js';
	import TaskItem from './TaskItem.svelte';

	// $state — familiar from Week 1, here holding an array instead of a
	// single number. Because Svelte 5's $state deeply proxies arrays and
	// objects, mutating a property of an item inside the array (see
	// toggleTask below) is enough to trigger a re-render — no need to
	// replace the whole array.
	let tasks = $state(initialTasks);

	// Also $state — a second, independent value, same rune, same pattern
	// used for `count` in earlier demos.
	let showOnlyIncomplete = $state(false);

	function toggleTask(id) {
		const task = tasks.find((t) => t.id === id);
		if (task) task.done = !task.done;
	}

	// A plain function, not $derived — not taught yet at this point in the
	// module (there's a separate optional supplement, 11-svelte-state-vs-derived,
	// covering it) — called
	// directly in the template below, same approach used in the Week 3
	// materials for computing a filtered/sliced list.
	function visibleTasks() {
		return showOnlyIncomplete ? tasks.filter((t) => !t.done) : tasks;
	}
</script>

<main>
	<h1>Study Tasks</h1>

	<label>
		<input type="checkbox" bind:checked={showOnlyIncomplete} />
		Show only incomplete
	</label>

	<ul class="task-list">
		{#each visibleTasks() as task (task.id)}
			<TaskItem {task} onToggle={toggleTask} />
		{:else}
			<li class="empty">Nothing left to do — nice work.</li>
		{/each}
	</ul>
</main>

<style>
	main {
		max-width: 500px;
		margin: 2rem auto;
		font-family: system-ui, sans-serif;
		padding: 0 1rem;
	}

	.task-list {
		list-style: none;
		padding: 0;
		margin-top: 1rem;
	}

	.empty {
		color: #888;
		font-style: italic;
		padding: 1rem 0;
	}
</style>
