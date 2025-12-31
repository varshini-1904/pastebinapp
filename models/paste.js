const mongoose = require("mongoose");

const pasteSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  content: { type: String, required: true },
  expires_at: { type: Date, default: null },
  remaining_views: { type: Number, default: null },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Paste", pasteSchema);
