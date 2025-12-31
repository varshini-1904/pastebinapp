const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/api/healthz", (req, res) => {
  const dbReady = mongoose.connection.readyState === 1;
  res.status(200).json({ ok: dbReady });
});

module.exports = router;

