/**
 * src/env.js — the "guest list" for this project's environment variables.
 * ------------------------------------------------------------------
 * SvelteKit only lets you import an environment variable from
 * $app/env/private or $app/env/public if it's named here first, using
 * defineEnvVars. Anything NOT on this list simply isn't importable —
 * that's the point: it's a deliberate, visible guest list, not an
 * open door to every variable in .env.
 *
 * SKETCH_API_URL has no `public` or `static` option set, which means
 * it defaults to private (server-only) and dynamic (read fresh each
 * time the app starts, not baked into the build). Exactly what we
 * want: the Express API's address should never reach the browser, and
 * should be easy to change per environment without rebuilding.
 *
 * FAILURE MODE: if SKETCH_API_URL is missing from .env, SvelteKit
 * refuses to start at all and stops with an "env_invalid" error
 * telling you exactly which variable is missing — much clearer than
 * a mysterious crash later when something tries to use it.
 * ------------------------------------------------------------------
 */

import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	SKETCH_API_URL: {}
});
