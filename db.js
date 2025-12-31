
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URI is not defined");
  }

  await mongoose.connect(process.env.MONGO_URL);

  isConnected = true;
}

module.exports = { connectDB };
