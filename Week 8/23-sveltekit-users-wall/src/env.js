// src/env.js — the "guest list" for environment variables (as in Week 4).
// Only variables named here can be imported, and by default they are private:
// importable only from $app/env/private, which never reaches the browser.
import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	// Where our Express users API is running. Set it in .env (copy .env.example).
	// If it is missing, SvelteKit stops at start-up with an 'env_invalid' error.
	EXPRESS_URL: {}
});
