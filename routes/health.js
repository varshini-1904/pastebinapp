const express = require("express");
const router = express.Router();
const { connectDB, mongoose } = require("../db");

router.get("/api/healthz", async (req, res) => {
  try {
    await connectDB();
    await mongoose.connection.db.admin().ping();
    res.status(200).json({ ok: true });
  } catch {
    res.status(500).json({ ok: false });
  }
});

module.exports = router;
