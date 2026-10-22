// SvelteKit 3 wants a list of the environment variables your app uses.
// Think of it as a guest list: only variables named here can be imported,
// and by default they are PRIVATE (server code only, never sent to the browser).
//
// The actual values live in your .env file. If NASA_API_KEY is missing from
// .env, SvelteKit stops with an "env_invalid" error telling you so.
import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	NASA_API_KEY: {}
});
