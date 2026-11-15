# 22-express-users-api — Week 8 users and sessions API

An Express + Mongoose API for the class wall: register, log in, log out, and post. It has the same shape as `18-express-mongo-api` (the Sketch Gallery API), with two additions:
- **users**
- **routes that check who is asking**

It runs alongside `23-sveltekit-users-wall`, which is the only thing that calls it (from SvelteKit's server side).

## Set up (do the .env step first)

1. `cp .env.example .env`, then paste the class connection string into `MONGODB_URI`. The database name `ClassWall` is the word after the last `/` and before the `?`. Everyone uses the same one, which is why the wall is shared. MongoDB creates it the first time anyone registers.
2. `npm install`
3. `npm run dev` (restarts when you save) or `npm start`. It listens on http://localhost:3001.

The project was set up with `npm init` followed by `npm install express mongoose dotenv`. Its `package.json` has `"type": "module"`, so it can use `import`.

## Files

| File | Job |
|---|---|
| `server.js` | The routes, and connecting to MongoDB |
| `lib/userData.js` | The User schema and model; create, find, start and end a session |
| `lib/postData.js` | The Post schema and model; get and create posts |
| `lib/auth.js` | `userFromToken(req)`, the one helper that answers "who is asking?" |
| `try-express.js` | Talks to Express directly, without the browser (demo and Lab 2) |

## Routes

| Method | Path | Needs a token? | Answers |
|---|---|---|---|
| POST | `/register` | no | 201 created · 400 missing field · 409 username taken |
| POST | `/login` | no | 200 `{ token, user }` · 401 wrong username or password |
| GET | `/posts` | no | 200 `{ posts }`, newest first |
| GET | `/me` | yes | 200 `{ user }` · 401 |
| POST | `/logout` | yes | 200 · 401 |
| POST | `/posts` | yes | 201 `{ post }` · 400 empty or too long · 401 |
| GET | `/my-posts` | yes | **Lab 3**: you write this one |

A token is sent as the header `Authorization: Bearer <token>`. Express never sends back `password` or `sessionToken`: the `toJSON` transform in `userData.js` deletes both from every user it sends.

## Labs

| Lab | Where | What |
|---|---|---|
| Lab 1, part A | hop 4 in `server.js`, hop 5 in `lib/userData.js` | Add a `console.log` at each hop and watch a register request arrive |
| Lab 1, part B | `LAB 1` steps 1–3 | Add a `favouritePlant` field all the way through to the schema |
| Lab 3 | `LAB 3` steps 1–2 | `getPostsByAuthor()`, then `GET /my-posts` |
| Lab 3, stretch 2 | — | `DELETE /posts/:id`, answering 403 if the post isn't yours |

## What we left out (on purpose)

- **Password hashing.** Passwords are stored in plain text, so you can see them in Atlas. Hashing them with bcryptjs is a post-study task.
- **Token expiry on the server.** Tokens last until logout, while the cookie expires on its own clock. Making the token expire too is a post-study stretch.
- **One login per user.** A new login replaces the old token.
- **Sessions collection, express-session, Passport, JWT.** These are named in class, not used.
- **Error handling.** It is kept minimal so the flow is easy to read. If MongoDB is unreachable at start-up, the server stops after 5 seconds with an error.
- **CORS.** There is no `cors()` because the browser never calls Express directly.

## Further reading

- MDN, Session management: https://developer.mozilla.org/en-US/docs/Web/Security/Authentication/Session_management
- Mongoose FAQ, "unique" is an index, not a validator: https://mongoosejs.com/docs/faq.html#unique-doesnt-work
- MDN, HTTP authentication (the Bearer type): https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Authentication#bearer

