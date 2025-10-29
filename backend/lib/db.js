import mongoose from "mongoose";

export async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not set in environment");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  mongoose.set("strictQuery", true);

  await mongoose.connect(mongoUri, {
    dbName: process.env.MONGODB_DB || undefined,
  });

  console.log("MongoDB connected");
  return mongoose.connection;
}


