<h1>12 — SvelteKit data-fetching patterns demo</h1>

<p>This demo pairs four pages to tell the story of why we go server-side, and how:</p>

<ol>
	<li>
		<a href="/naive">Naive</a> — fetches NASA's NeoWs API directly from the browser, API key
		exposed. Open dev tools first.
	</li>
	<li>
		<a href="/load">Load</a> — the idiomatic fix: a <code>load</code> function
		(<code>+page.server.js</code>) supplies data automatically, before the page even
		renders. No button, no loading state.
	</li>
	<li>
		<a href="/proxied">Proxied</a> — the same data via a <code>+server.js</code> endpoint
		instead, fetched on demand when you click a button. Contrast this with
		<code>/load</code> to see when you'd reach for each.
	</li>
	<li><a href="/lab">Lab</a> — your turn: extend the <code>+server.js</code> proxy with a date-range parameter.</li>
</ol>

<p>See <code>README.md</code> for setup and teaching notes.</p>
