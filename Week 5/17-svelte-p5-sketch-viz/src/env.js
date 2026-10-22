/**
 * src/env.js — the "guest list" for this project's environment variables.
 * ------------------------------------------------------------------
 * SvelteKit only lets you import an environment variable from
 * $app/env/private or $app/env/public if it's named here first, using
 * defineEnvVars. SKETCH_API_URL defaults to private (server-only) and
 * dynamic, which is exactly what we want: Express's address never
 * reaches the browser, and it's easy to change without a rebuild.
 *
 * FAILURE MODE: if SKETCH_API_URL is missing from .env, SvelteKit
 * refuses to start and stops with an "env_invalid" error naming
 * exactly which variable is missing.
 * ------------------------------------------------------------------
 */

import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	SKETCH_API_URL: {}
});
