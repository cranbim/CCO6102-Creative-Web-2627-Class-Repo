<script>
	import { pretendLogin } from '#lib/pretendLogin.svelte.js';
</script>

<h1>Pretend login</h1>
<p>
	Pretend logged in:
	{#if pretendLogin.loggedIn}<strong>yes</strong>{:else}<strong>no</strong>{/if}
</p>

<p>Press <em>Pretend log in</em>, then click between the pages. It seems to work! Now predict, then try:</p>
<ol>
	<li>Press the browser's <strong>refresh</strong> button. Are you still logged in?</li>
	<li>Pretend log out, then type <code>/pretend/secret</code> straight into the address bar. Can you see the secret?</li>
	<li>Pretend log in, then open this page in a <strong>second browser</strong> (or a private window). Who is logged in there?</li>
</ol>
