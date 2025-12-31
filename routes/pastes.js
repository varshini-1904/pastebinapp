const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Paste = require("../models/paste");
const { connectDB } = require("../db");
const { getNow } = require("../utils/time");

router.post("/api/pastes", async (req, res) => {
  await connectDB();

  const { content, ttl_seconds, max_views } = req.body;

  if (!content || typeof content !== "string" || !content.trim())
    return res.status(400).json({ error: "content required" });

  if (ttl_seconds !== undefined && (!Number.isInteger(ttl_seconds) || ttl_seconds < 1))
    return res.status(400).json({ error: "invalid ttl_seconds" });

  if (max_views !== undefined && (!Number.isInteger(max_views) || max_views < 1))
    return res.status(400).json({ error: "invalid max_views" });

  const id = crypto.randomBytes(4).toString("hex");
  const now = getNow(req);

  const expires_at = ttl_seconds ? new Date(now + ttl_seconds * 1000) : null;

  await Paste.create({
    id,
    content,
    expires_at,
    remaining_views: max_views ?? null
  });

  res.status(201).json({
    id,
    url: `${req.protocol}://${req.get("host")}/p/${id}`
  });
});

router.get("/p/:id", async (req, res) => {
  await connectDB();

  const paste = await Paste.findOne({ id: req.params.id });
  if (!paste) return res.sendStatus(404);

  const now = getNow(req);

  if (paste.expires_at && now > paste.expires_at.getTime())
    return res.sendStatus(404);

  if (paste.remaining_views === 0)
    return res.sendStatus(404);

  if (paste.remaining_views !== null) {
    paste.remaining_views -= 1;
    await paste.save();
  }

  const safe = paste.content
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  res.setHeader("Content-Type", "text/html");
  res.send(`<pre>${safe}</pre>`);
});

module.exports = router;
