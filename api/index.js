const app = require("../src/app");
const { connectDB } = require("../db");

let isReady = false;

async function init() {
  if (!isReady) {
    await connectDB();
    isReady = true;
  }
}

module.exports = async (req, res) => {
  await init();
  return app(req, res);
};
