<script>
	// LAB PAGE — this page is finished. Your job is in the README: make these
	// checks pass by creating the API route files they are calling.

	/** @type {{ title: string, text: string }[]} */
	let results = $state([]);

	/**
	 * @param {string} method
	 * @param {string} url
	 */
	async function check(method, url) {
		let text;
		try {
			const response = await fetch(url, { method });
			const body = (await response.text()).replace(/\s+/g, ' ').slice(0, 160);
			text = `${response.status} ${response.statusText}\n${body}`;
		} catch (/** @type {any} */ err) {
			text = `Network error: ${err.message}`;
		}
		results.unshift({ title: `${method} ${url}`, text });
	}
</script>

<h1>Lab: routing as an API</h1>

<p>
	Each button sends a request to a URL in <em>this</em> project and shows the status code that
	comes back. Right now some of them will fail — that's the exercise. See the README's Lab
	section for what to build.
</p>

<p>
	<button onclick={() => check('GET', '/api/ideas')}>GET /api/ideas</button>
	<button onclick={() => check('GET', '/api/ideas/count')}>GET /api/ideas/count</button>
	<button onclick={() => check('POST', '/api/ideas/count')}>POST /api/ideas/count</button>
	<button onclick={() => check('GET', '/api/ideas/1')}>GET /api/ideas/1 (stretch)</button>
</p>

{#each results as result}
	<h3>{result.title}</h3>
	<pre>{result.text}</pre>
{/each}
