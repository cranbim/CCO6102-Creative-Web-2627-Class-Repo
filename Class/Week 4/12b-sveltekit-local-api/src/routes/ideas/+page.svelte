<script>
	/** @typedef {{ id: number, text: string, author: string }} Idea */

	/** @type {Idea[]} */
	let ideas = $state([]);
	let loaded = $state(false);
	let errorMessage = $state('');

	// The form's two fields. bind:value keeps these variables in sync with
	// what the user types — the same bind:value you met in Week 2.
	let text = $state('');
	let author = $state('');

	// A running log of the requests this page has made, newest first, so you
	// can SEE the method, the URL and the status code of each one.
	/** @type {string[]} */
	let requestLog = $state([]);

	/**
	 * @param {string} method
	 * @param {string} url
	 * @param {number} status
	 */
	function log(method, url, status) {
		requestLog.unshift(`${method} ${url} → ${status}`);
		if (requestLog.length > 6) requestLog.pop();
	}

	// async/await: fetch() has to wait for the server to answer, which takes
	// time. "await" means "pause THIS function until the answer arrives";
	// "async" marks a function that is allowed to do that.
	async function loadIdeas() {
		errorMessage = '';
		try {
			const response = await fetch('/api/ideas'); // a GET request to OUR OWN route
			log('GET', '/api/ideas', response.status);
			if (!response.ok) throw new Error(`The server answered ${response.status}`);
			ideas = await response.json();
			loaded = true;
		} catch (/** @type {any} */ err) {
			errorMessage = err.message;
		}
	}

	/** @param {SubmitEvent} event */
	async function addIdea(event) {
		event.preventDefault(); // stop the browser doing its own full-page form submit
		errorMessage = '';
		try {
			const response = await fetch('/api/ideas', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ text, author }) // the data we are sending
			});
			log('POST', '/api/ideas', response.status);
			const body = await response.json();
			if (!response.ok) throw new Error(body.error || 'Something went wrong');
			text = '';
			author = '';
			await loadIdeas(); // ask the server for the list again — now it includes our idea
		} catch (/** @type {any} */ err) {
			errorMessage = err.message;
		}
	}
</script>

<h1>Ideas — calling our own API</h1>

<p>
	Open dev tools → Network tab, then use the button and the form. Every request goes to
	<code>/api/ideas</code> — a route inside this project, defined in
	<code>src/routes/api/ideas/+server.js</code>.
</p>

<p>
	<a href="/api/ideas" target="_blank">Open /api/ideas directly in a new tab</a> — it's just a URL.
	The browser shows the raw JSON the route returns.
</p>

<h2>1. GET — fetch the list</h2>
<button onclick={loadIdeas}>{loaded ? 'Reload ideas' : 'Load ideas'}</button>

{#if loaded}
	<ul>
		{#each ideas as idea (idea.id)}
			<li><strong>{idea.text}</strong> — {idea.author}</li>
		{/each}
	</ul>
{/if}

<h2>2. POST — add an idea</h2>
<form onsubmit={addIdea}>
	<p><label>Idea <input bind:value={text} maxlength="140" placeholder="Your idea…" /></label></p>
	<p><label>Your name <input bind:value={author} placeholder="(optional)" /></label></p>
	<button type="submit">Send idea</button>
</form>

{#if errorMessage}
	<p class="error">Error: {errorMessage}</p>
{/if}

<h2>Request log</h2>
<pre>{requestLog.length ? requestLog.join('\n') : '(no requests yet)'}</pre>

<style>
	.error {
		color: #b00020;
	}
	input {
		padding: 0.3rem;
		width: 22rem;
		max-width: 100%;
	}
</style>
