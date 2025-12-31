
const mongoose = require("mongoose");

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URL);
  isConnected = true;
}

module.exports = { connectDB, mongoose };

