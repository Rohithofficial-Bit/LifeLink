import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lifelink_db', {
      serverSelectionTimeoutMS: 4000
    });
    console.log(`[MongoDB Connected] Host: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[MongoDB Warning] Could not connect to MongoDB instance: ${error.message}`);
    console.warn(`[MongoDB Notice] The application will operate with in-memory state or seed database fallback mode if MongoDB is offline.`);
    return false;
  }
};
