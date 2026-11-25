<!--
	src/routes/+page.svelte — the chat page.
	------------------------------------------------------------------
	The whole conversation lives HERE, in the browser, in a $state list.
	The model remembers nothing between calls, so every time we send a
	message we send the whole list to our own route, /api/chat, which adds
	the service prompt and asks Mistral. (Statelessness again: Weeks 7 and 8.)
	------------------------------------------------------------------
-->
<script>
	// Each message looks like { role: 'user', content: 'How often do I water a fern?' }
	// role is 'user' (you) or 'assistant' (Fern): the names Mistral uses.
	let messages = $state([]);
	let draft = $state('');
	let waiting = $state(false);
	let errorMessage = $state('');

	async function send(event) {
		// Stop the browser's normal form submit (a full page reload).
		event.preventDefault();

		if (draft.trim() === '') {
			return;
		}

		// Show the user's message straight away, and clear the box.
		const text = draft;
		messages.push({ role: 'user', content: text });
		draft = '';
		errorMessage = '';
		waiting = true;

		try {
			// await means: pause here until our server answers, then carry on.
			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ messages: messages })
			});
			const data = await res.json();

			if (res.ok) {
				messages.push({ role: 'assistant', content: data.reply });
			} else {
				// e.g. 400 (too long) or 429 (too fast). Take the message back off
				// the list and put it back in the box, so it can be edited and resent.
				errorMessage = data.error;
				messages.pop();
				draft = text;
			}
		} catch (err) {
			errorMessage = 'Could not reach our server. Is npm run dev still running?';
			messages.pop();
			draft = text;
		}

		waiting = false;
	}
</script>

<svelte:head>
	<title>Fern — plant-care helper</title>
</svelte:head>

<main>
	<h1>Ask Fern 🌿</h1>
	<p class="intro">Fern answers questions about caring for houseplants, and nothing else.</p>

	<div class="chat">
		<p class="bubble assistant">Hello! I'm Fern. Ask me anything about looking after your houseplants.</p>

		{#each messages as message}
			<p class="bubble {message.role}">{message.content}</p>
		{/each}

		{#if waiting}
			<p class="bubble assistant waiting">Fern is thinking…</p>
		{/if}
	</div>

	{#if errorMessage}
		<p class="error">{errorMessage}</p>
	{/if}

	<form onsubmit={send}>
		<textarea bind:value={draft} rows="3" placeholder="e.g. Why are my monstera's leaves turning yellow?"></textarea>
		<button type="submit" disabled={waiting}>Send</button>
	</form>
</main>

<style>
	main {
		max-width: 40rem;
		margin: 2rem auto;
		padding: 0 1rem;
		font-family: system-ui, sans-serif;
	}
	.intro {
		color: #555;
	}
	.chat {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin: 1rem 0;
	}
	.bubble {
		margin: 0;
		padding: 0.6rem 0.9rem;
		border-radius: 0.8rem;
		max-width: 80%;
		white-space: pre-wrap;
	}
	.user {
		align-self: flex-end;
		background: #d8ecff;
	}
	.assistant {
		align-self: flex-start;
		background: #e5f5e5;
	}
	.waiting {
		color: #777;
		font-style: italic;
	}
	.error {
		color: #a00;
	}
	form {
		display: flex;
		gap: 0.5rem;
	}
	textarea {
		flex: 1;
		font: inherit;
	}
</style>
