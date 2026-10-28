require("dotenv").config(); // load .env into process.env FIRST
const express = require("express");
const cors = require("cors");

// Fail fast with a clear message instead of a confusing crash later.
for (const name of ["DATABASE_URL", "JWT_SECRET", "CLIENT_ORIGIN"]) {
  if (!process.env[name]) {
    console.error(`Missing required environment variable: ${name} (see .env.example)`);
    process.exit(1);
  }
}

const app = express();

// CORS: browsers block a page on one origin (the React app) from calling an
// API on another unless the API says it's allowed. We allow ONLY our client.
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json()); // parse JSON request bodies into req.body

app.get("/health", (req, res) => res.json({ ok: true }));
app.use("/auth", require("./routes/auth"));
app.use("/me", require("./routes/me"));
app.use("/quotes", require("./routes/quotes"));
app.use("/favorites", require("./routes/favorites"));

// Unknown route -> JSON 404 (instead of Express's default HTML page)
app.use((req, res) => res.status(404).json({ error: "Not found." }));

// Error handler: anything passed to next(err) lands here.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Request body is not valid JSON." });
  }
  console.error(err);
  res.status(500).json({ error: "Something went wrong on the server." });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
