const app = require("../app");
const connectDB = require("../db");

module.exports = async (req, res) => {
  try {
    // Ensure DB connection (cached, serverless-safe)
    await connectDB();

    // Hand over request to Express
    return app(req, res);
  } catch (err) {
    console.error("API ERROR:", err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
