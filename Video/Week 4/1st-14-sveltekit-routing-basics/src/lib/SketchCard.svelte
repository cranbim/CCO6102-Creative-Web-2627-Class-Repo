<script>
	// A shared component under src/lib — this is the "#lib for shared
	// components" half of the picture (sketches.js above is the "#lib for
	// shared non-component code" half). Both are imported the same way,
	// from anywhere, via the #lib alias.
	//
	// $props() with destructuring and a default value is Svelte 5's way
	// of declaring props — the `linked = true` part means callers don't
	// have to pass `linked` unless they want to override it.
	/** @type {{ sketch: { slug: string, title: string, description: string, color: string }, linked?: boolean }} */
	let { sketch, linked = true } = $props();
	console.log("rendering the sketch card component")
	console.log(sketch)
</script>

{#if linked}
	<a class="card" href="/gallery/{sketch.slug}" style:--card-color={sketch.color}>
		<span class="swatch"></span>
		<h3>{sketch.title}</h3>
		<p>{sketch.description}</p>
	</a>
{:else}
	<div class="card" style:--card-color={sketch.color}>
		<span class="swatch"></span>
		<h3>{sketch.title}</h3>
		<p>{sketch.description}</p>
	</div>
{/if}

<style>
	.card {
		display: block;
		border: 1px solid #ddd;
		border-radius: 8px;
		padding: 1rem;
		text-decoration: none;
		color: inherit;
		transition: box-shadow 0.15s ease;
	}
	a.card:hover {
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}
	.swatch {
		display: block;
		width: 100%;
		height: 60px;
		border-radius: 4px;
		background: var(--card-color, #ccc);
		margin-bottom: 0.75rem;
	}
	h3 {
		margin: 0 0 0.35rem 0;
	}
	p {
		margin: 0;
		color: #555;
		font-size: 0.9rem;
	}
</style>
