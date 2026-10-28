// ---------------------------------------------------------------------------
// AUTH MIDDLEWARE  —  "the bouncer" for protected routes
// ---------------------------------------------------------------------------
// How the token flows:
//   1. The user logs in -> the server signs a JWT containing their user id.
//   2. The browser stores it and sends it back on every protected request in
//      a header:   Authorization: Bearer <token>
//   3. THIS middleware runs before the route handler. It checks the signature
//      (proving WE issued the token and nobody edited it) and the expiry.
//   4. If it's good, we put the user's id on `req.user` so the route handler
//      knows who is asking. If not, we stop with a 401.
const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const header = req.headers.authorization || ""; // "Bearer eyJhbGciOi..."
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ error: "Missing token. Send an 'Authorization: Bearer <token>' header." });
  }

  try {
    // jwt.verify throws if the signature is wrong, the token was tampered
    // with, or it has expired. Otherwise it returns the payload we signed.
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // `sub` ("subject") is the standard JWT field we used to store the user id.
    req.user = { id: payload.sub };
    next(); // hand off to the actual route handler
  } catch (err) {
    const message =
      err.name === "TokenExpiredError"
        ? "Your session has expired. Please log in again."
        : "Invalid token. Please log in again.";
    return res.status(401).json({ error: message });
  }
}

module.exports = { requireAuth };
