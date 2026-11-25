/**
 * src/env.js — the "guest list" of environment variables this app may use.
 * ------------------------------------------------------------------
 * Only variables named here can be imported from $app/env/private, and
 * private means server-only: the browser can never see them.
 *
 * MISTRAL_API_KEY is the personal key Dave gives you for this exercise.
 * Treat it like a password: every message is paid for from the class
 * account, so never commit it and never share it.
 * Its value lives in .env (copy .env.example). If it is missing from .env,
 * SvelteKit will not start and names the missing variable ("env_invalid").
 * ------------------------------------------------------------------
 */

import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	MISTRAL_API_KEY: {}
});
