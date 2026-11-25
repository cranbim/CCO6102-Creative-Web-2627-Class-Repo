<script>
	let { form } = $props();
</script>

<h1>Log in</h1>

<form method="POST">
	<label>
		Username
		<input name="username" required />
	</label>
	<label>
		Password
		<input name="password" type="password" required />
	</label>
	<button>Log in</button>
</form>

{#if form}
	<p class="error">{form.message}</p>
{/if}
