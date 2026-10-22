import { defineEnvVars } from '@sveltejs/kit/env';

// SvelteKit 3 asks you to DECLARE the environment variables your app uses.
// Anything declared here can be imported (server-side only, because it is
// private by default) from '$app/env/private'. Values come from your .env file.
export const variables = defineEnvVars({
	NASA_API_KEY: {
		description: "Your personal NASA API key. Optional: falls back to NASA's public DEMO_KEY.",
		// The schema can supply a default when the variable isn't set in .env.
		// DEMO_KEY is genuinely public, rate-limited (30/hr), and safe to commit.
		schema: (/** @type {string | undefined} */ value) => value || 'DEMO_KEY'
	}
});
