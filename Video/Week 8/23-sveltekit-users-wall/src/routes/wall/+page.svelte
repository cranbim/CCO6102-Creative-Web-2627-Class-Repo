<script>
	// data.posts comes from load(); data.user from the layout; form from the action.
	let { data, form } = $props();
</script>

<h1>The Class Wall</h1>

<form method="POST">
	<label>
		Say something to the class (posting as {data.user.username})
		<textarea name="text" rows="3" maxlength="280" required></textarea>
	</label>
	<button>Post</button>
</form>

{#if form}
	<p class="error">{form.message}</p>
{/if}

{#each data.posts as post (post.id)}
	<article>
		<p>{post.text}</p>
		<small>— {post.author}, {new Date(post.createdAt).toLocaleString()}</small>
	</article>
{:else}
	<p>No posts yet. Be the first!</p>
{/each}

<style>
	textarea {
		display: block;
		width: 100%;
		margin-top: 0.3rem;
	}
	article {
		background: white;
		border-left: 4px solid #2f5d3a;
		padding: 0.5rem 1rem;
		margin: 1rem 0;
	}
	article p {
		margin: 0 0 0.3rem;
	}
</style>
