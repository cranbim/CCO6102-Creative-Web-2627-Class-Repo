<h1>12b — Pages, and an API of our own</h1>

<p>
	This is a small multi-page site, like demo 14 — but one page talks to an
	<strong>API route that lives inside this same project</strong>. No external service, no API
	key, no <code>.env</code>: the data is just an array on the server.
</p>

<ul>
	<li><a href="/about">About</a> — a plain page. The folder name is the URL.</li>
	<li>
		<a href="/ideas">Ideas</a> — a page with a button that calls <code>GET /api/ideas</code>,
		and a form that sends <code>POST /api/ideas</code>.
	</li>
	<li><a href="/lab">Lab</a> — your turn: routing as an API.</li>
</ul>

<p>
	The thing to look for: <code>src/routes/api/ideas/+server.js</code>. It is the same kind of
	file the NASA demo uses later — there it calls out to NASA, here it just returns an array.
</p>
