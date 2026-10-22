<h1>12c — Getting data from NASA, step by step</h1>

<p>
	A gentler version of demo 12. Same story, shorter and plainer code. We use NASA's asteroid
	feed (NeoWs) and meet three new ideas, one page each:
</p>

<ol>
	<li>
		<a href="/naive">Naive</a> — fetch NASA straight from the browser, key in the code.
		Open dev tools first and see who can read the key.
	</li>
	<li>
		<a href="/load">Load</a> — the key moves into <code>.env</code>, and a
		<code>load</code> function fetches the data on the server before the page is shown.
	</li>
	<li>
		<a href="/proxied">Proxied</a> — the same data again, but fetched when you click a
		button, through an API route of our own (like demo 12b).
	</li>
	<li><a href="/lab">Lab</a> — your turn: let the API route accept a <code>?days=</code> value.</li>
</ol>

<p>
	<strong>Before you start:</strong> copy <code>.env.example</code> to <code>.env</code>. Pages
	2 and 3 need it. See <code>README.md</code>.
</p>
