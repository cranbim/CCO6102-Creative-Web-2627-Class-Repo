<script>
	// 'form' is whatever our action returned with fail(...) — for example
	// { message: 'That username is taken — try another.', username: 'dave' }.
	// It is null the first time the page loads.
	let { form } = $props();
</script>

<h1>Register</h1>

<!-- LAB 1 PART A — hop 1: this form is where the journey starts. With
     DevTools → Network open, submit it and find the POST request. -->

<!-- method="POST" with no 'action' attribute: the browser sends the form to
     THIS page's address, and SvelteKit hands it to the 'default' action in
     +page.server.js. Plain HTML — it works even with JavaScript switched off. -->
<form method="POST">
	<label>
		Username
		<input name="username" required />
	</label>
	<label>
		Password
		<input name="password" type="password" required />
	</label>

	<!-- LAB 1 — step 4: add a third input here with name="favouritePlant". -->

	<button>Register</button>
</form>

{#if form}
	<p class="error">{form.message}</p>
{/if}
