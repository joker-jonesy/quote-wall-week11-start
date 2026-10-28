# Quote Wall — Week 11 Starter (NEWM N422)

Starting point for the Week 11 demo: **Authentication in React**.

- `server/` is the finished **Week 10** API: signup, login (JWT), protected `GET /me`, and `GET /quotes`. There is no Favorite model yet.
- `client/` is an empty Vite + React + React Router app. The styling and a presentational `QuoteCard` are provided so we can focus on authentication, not CSS.

## Run it

You need Node 20+ and PostgreSQL.

```bash
createdb quote_wall_dev

# Terminal 1: API
cd server
cp .env.example .env          # edit DATABASE_URL and JWT_SECRET
npm install
npx prisma migrate dev
npm run db:seed
npm run dev                   # http://localhost:4000

# Terminal 2: client
cd client
cp .env.example .env
npm install
npm run dev                   # http://localhost:5173
```

`CLIENT_ORIGIN` in `server/.env` must match the URL Vite prints (CORS).

## Demo plan (what we build live)

**Backend**
1. Add a `Favorite` model with `@@unique([userId, quoteId])` and run a migration.
2. Add protected `GET/POST/DELETE /favorites` routes. The user id comes from `req.user.id` (the verified token), never the request body.
3. Challenge: `savedCount` / `savedByMe` on `GET /quotes`.

**Frontend**
1. `src/api.js`: one `apiFetch` helper that adds `Authorization: Bearer <token>` and logs out on 401.
2. `AuthProvider` and `useAuth`: token in localStorage, restore the session through `GET /me` on load.
3. Login and Signup forms that show the API's error message.
4. `ProtectedRoute` and a Log out button.
5. Quote Wall page with Save/Saved toggles, then My Favorites page with Remove.

Finish by testing with two accounts to confirm favorites never leak between users.
