const express = require("express");
const prisma = require("../prisma");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// GET /me  (protected)
// "Who am I?" The React app calls this on page load to find out whether the
// token it saved is still good.
router.get("/", requireAuth, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    // The token can be valid for a user who has since been deleted.
    if (!user) {
      return res.status(401).json({ error: "Account no longer exists." });
    }
    res.json({ user: { id: user.id, email: user.email } });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
