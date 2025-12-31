
const mongoose = require("mongoose");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectDB() {
  // If already connected, reuse
  if (cached.conn) {
    return cached.conn;
  }

  // If not connected, create connection once
  if (!cached.promise) {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is missing");
    }

    cached.promise = mongoose.connect(process.env.MONGO_URL);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectDB;

