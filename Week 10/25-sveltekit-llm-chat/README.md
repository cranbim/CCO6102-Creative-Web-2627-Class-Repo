# 25-sveltekit-llm-chat — Fern, a plant-care helper (Week 10, Track 2)

A chat with a large language model (LLM), inside a SvelteKit app. No Express this time: SvelteKit's own server
route talks to Mistral. A **service prompt** in a text file decides what the chat talks about and how; a few rules in
our own code are enforced whatever the model does.

## Set it up

1. **`.env` first.** Copy `.env.example` to `.env` and paste in the personal Mistral API key Dave gave you. Without a
   key in `.env`, SvelteKit will not start and says `env_invalid … MISTRAL_API_KEY`.
2. `npm install`
3. `npm run dev` → open http://localhost:5173

This project was created with:

```
npx sv create 25-sveltekit-llm-chat --template minimal --no-types --no-add-ons --install npm
```

`--template minimal` = an almost empty project; `--no-types` = plain JavaScript; `--no-add-ons` = nothing extra
(no Tailwind, no testing tools); `--install npm` = install the packages straight away.

> **Your key is a password, and it costs money.** Mistral's API is pay-as-you-go: every message is paid for from the
> class account's credit. Never commit `.env`, never paste the key into chat or code, and don't share it. Keys are
> for this exercise and will be switched off afterwards.
>
> **Privacy:** what you type is sent to Mistral, a company outside the university. Never type anything personal into
> the chat — a good rule for any AI service.

## How it fits together

```
browser (+page.svelte)          our server (+server.js)                     Mistral
the conversation, in $state ──► checks it, adds the service prompt ──► mistral-small-latest
                            ◄── { reply }                         ◄── choices[0].message.content
```

| File | Its one job |
|---|---|
| `src/routes/+page.svelte` | The chat page. Keeps the whole conversation and sends it every time (the model remembers nothing). |
| `src/routes/api/chat/+server.js` | `POST /api/chat`: check the request, put the service prompt first, ask Mistral, answer with a status code. |
| `src/lib/server/service-prompt.txt` | The service prompt: Fern's scope and tone, in plain English. Read with `?raw`. |
| `src/lib/server/service-prompt-cactus.txt` | A second prompt to swap in (change the file name in the `?raw` import line). |
| `src/lib/server/chatRules.js` | The rules the server enforces: message length, history, reply length, temperature. **Also the lab file.** |
| `src/lib/server/mistral.js` | The one place that calls Mistral (`fetch`, Bearer key). |
| `src/env.js` | The guest list: `MISTRAL_API_KEY` is the only variable, and it is server-only. |

### Routes

| Route | Method | What it does | Status codes |
|---|---|---|---|
| `/` | GET | The chat page | 200 |
| `/api/chat` | POST | Body `{ messages: [ { role, content } ] }` → `{ reply }` | 200 reply · 400 empty, not a list, no text, too long · 429 the class account's rate limit was hit · 502 Mistral did not answer |

## The new things (everything else you have seen before)

- **The `?raw` import** (`+server.js`): turns a text file into a string. Vite does it at build time.
- **Message roles:** `system` (the service prompt — our "service prompt" is what Mistral and most docs call the
  *system prompt*), `user`, `assistant`.
- **Statelessness, again:** the model remembers nothing, so the page sends the conversation each time and the route
  sends at most the last `MAX_HISTORY` messages.
- **Prompts shape, code enforces:** the service prompt can be argued with (prompt injection); the numbers in
  `chatRules.js` cannot.

## Lab: make it yours (about 15 minutes)

The full steps are in the LAB comment at the top of `src/lib/server/chatRules.js`.

| Step | What to change | What correct looks like |
|---|---|---|
| 1 | Rewrite `service-prompt.txt`: new character, scope and tone | On-topic questions answered in the new voice |
| 2 | `MAX_MESSAGE_LENGTH` 400 → 200 | A 250-character message gets the 400 error message, whatever the model would say |
| 3 | Three test questions: on-topic, off-topic, sneaky | Helpful / polite refusal / (usually) refusal — write down what actually happened |
| Stretch | `MAX_HISTORY` 6 → 2, then a three-message conversation | It "forgets" your first message: it was never sent |

No restart needed: the dev server picks up edits to the `.txt` file and to `chatRules.js` on the next message.

## What we left out (on purpose)

- **Streaming** (the reply appearing word by word): the reply arrives all at once instead.
- **Saving conversations** on the server or in MongoDB: the chat lives in the page and is gone on refresh.
- **Login, and per-user limits** — see "Before you host this".
- **Proper moderation**: Mistral has a `safe_prompt` option and moderation endpoints; not used here.
- **The Mistral SDK**: plain `fetch`, the same pattern as NASA in Week 4.

## Before you host this (it is not hosted in Week 10)

- **The key becomes a host setting.** Like `PLANT_API_URL` on Vercel: set `MISTRAL_API_KEY` in the host's environment
  variables, never in code.
- **Anyone with the link can spend your money.** A public chat page lets strangers send requests that are paid for
  from your account. Put it behind a login (Week 8), add a limit per user, and set a spending limit in Mistral's
  admin panel before sharing it.
- **The API is not free.** Mistral's API needs billing switched on and prepaid credit. A hosted version needs its own
  key on its own account, with a spending limit.
- **Time limits.** Hosted functions have a maximum running time (Vercel Hobby: 300 seconds), and LLM replies can be slow.
  Keep `MAX_REPLY_TOKENS` modest.
- **The prompt file must travel with the app.** It does here, because `?raw` bakes it in at build time. Reading the file
  with Node's `fs` instead would likely fail on Vercel, which does not copy project files into a deployment.

## Where next: analytic and generative uses

- **Analyse text:** ask for JSON back to sort or label things, e.g. read a swap listing and return
  `{ "lightNeeds": "low" }`. Mistral's JSON mode: https://docs.mistral.ai/capabilities/structured_output/json_mode
  (the prompt itself must ask for JSON — https://docs.mistral.ai/resources/known-limitations).
- **Structured outputs** with a fixed shape: https://docs.mistral.ai/capabilities/structured_output
- **Generate text from data**, e.g. a listing description from a plant's name, species and light needs — the same
  route shape, a different service prompt.
- **Function calling** (the model asks your code to do something): https://docs.mistral.ai/capabilities/function_calling/
- Mistral's examples are in Python: the request bodies are the same JSON we send with `fetch`.

## Further reading

- Mistral — Chat completions (roles, multi-turn): https://docs.mistral.ai/inference/conversations/chat-completion
- Mistral — Prompting, "System Prompt": https://docs.mistral.ai/capabilities/completion/prompting_capabilities
- Vite — Importing an asset as a string (`?raw`): https://vite.dev/guide/assets#importing-asset-as-string
- OWASP — LLM01 Prompt Injection: https://genai.owasp.org/llmrisk/llm01-prompt-injection/
- Mistral — Usage and limits (billing, spending limits): https://docs.mistral.ai/admin/billing-usage/usage-limits


