import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/todo_app';
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    try {
      const memoryServer = await MongoMemoryServer.create();
      const mongoUri = memoryServer.getUri();
      const conn = await mongoose.connect(mongoUri);
      console.log(`MongoDB connected via in-memory server: ${conn.connection.host}`);
    } catch (memoryError) {
      console.error('MongoDB connection error:', error.message);
      console.error('In-memory MongoDB connection error:', memoryError.message);
      process.exit(1);
    }
  }
};

export default connectDB;
