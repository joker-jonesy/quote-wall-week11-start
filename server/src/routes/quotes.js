const express = require("express");
const prisma = require("../prisma");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// GET /quotes  (protected: members only)
router.get("/", requireAuth, async (req, res, next) => {
  try {
    const quotes = await prisma.quote.findMany({ orderBy: { id: "asc" } });
    res.json({ quotes });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
