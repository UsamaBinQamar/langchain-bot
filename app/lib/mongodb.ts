import mongoose from "mongoose";

// Define the type for our cached connection
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Declare the cached property on global with proper typing
declare global {
  var mongoose: { cache: MongooseCache };
}

// Never expose database connection strings in NEXT_PUBLIC_ variables
if (!process.env.NEXT_PUBLIC_MONGODB_URI) {
  console.log("aa111a");
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URIs;

// Initialize the cached connection
if (!global.mongoose) {
  global.mongoose = {
    cache: { conn: null, promise: null },
  };
}

async function dbConnect(): Promise<typeof mongoose> {
  console.log("aa222a");
  // If we have a connection, return it
  if (global.mongoose.cache.conn) {
    return global.mongoose.cache.conn;
  }

  // If we don't have a promise to connect, create one
  if (!global.mongoose.cache.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    global.mongoose.cache.promise = mongoose.connect(
      process.env.NEXT_PUBLIC_MONGODB_URI!,
      opts
    );
  }

  try {
    // Await the connection
    global.mongoose.cache.conn = await global.mongoose.cache.promise;
  } catch (error) {
    // On error, clear the promise and rethrow
    global.mongoose.cache.promise = null;
    throw error;
  }

  return global.mongoose.cache.conn;
}

export default dbConnect;
