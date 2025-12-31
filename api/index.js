const app = require("../app");
const { connectDB } = require("../db");

let isReady = false;

async function init() {
  if (!isReady) {
    await connectDB();
    isReady = true;
  }
}

module.exports = async (req, res) => {
  try {
    await init();
    return app(req, res);
  } catch (err) {
    console.error("INIT ERROR:", err);
    res.status(500).json({ error: "Server init failed" });
  }
};
