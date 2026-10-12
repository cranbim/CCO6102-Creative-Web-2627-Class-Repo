<h1>13 — p5 + NeoWs generative visualisation</h1>

<p>Extends <code>12-sveltekit-neo-proxy</code>'s pattern into something creative:</p>

<ol>
	<li><a href="/before">Before</a> — the sketch with placeholder/random data.</li>
	<li>
		<a href="/after">After</a> — driven by live NeoWs data via a <code>load</code>
		function. Size = diameter, colour = server-computed danger score, orbit radius = miss
		distance, orbit speed = velocity. No fetch, no button — data's ready when the page
		loads, because this is exactly the case <code>load</code> is for.
	</li>
	<li>
		<a href="/lab">Lab</a> — same live data, but fetched via <code>+server.js</code>
		instead (the other pattern, for contrast). Your task: map the unused
		<code>hazardous</code> flag.
	</li>
</ol>

<p>See <code>README.md</code> for setup and teaching notes.</p>
