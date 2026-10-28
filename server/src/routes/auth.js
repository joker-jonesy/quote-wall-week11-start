// Public routes: anyone can call these (that's how you GET a token).
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma");

const router = express.Router();

const MIN_PASSWORD_LENGTH = 8;
const SALT_ROUNDS = 10; // bcrypt "cost": higher = slower to brute-force

// Create a signed token that says "this is user #id".
// Only someone who knows JWT_SECRET can create a token that verifies.
function signToken(user) {
  return jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

// Never send passwordHash back to the client. Pick only the safe fields.
function publicUser(user) {
  return { id: user.id, email: user.email };
}

// POST /auth/signup   body: { email, password }
router.post("/signup", async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    if (!email.includes("@")) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      return res
        .status(400)
        .json({ error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.` });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: "An account with that email already exists." });
    }

    // Hash the password. The hash is one-way: we can check a password against
    // it later, but we can never get the original password back.
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await prisma.user.create({ data: { email, passwordHash } });

    // Log the new user in right away by returning a token.
    res.status(201).json({ token: signToken(user), user: publicUser(user) });
  } catch (err) {
    next(err);
  }
});

// POST /auth/login   body: { email, password }
router.post("/login", async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    const user = await prisma.user.findUnique({ where: { email } });

    // We deliberately use ONE message for "no such email" and "wrong
    // password". Different messages would let an attacker discover which
    // emails have accounts.
    const ok = user && (await bcrypt.compare(password, user.passwordHash));
    if (!ok) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    res.json({ token: signToken(user), user: publicUser(user) });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
