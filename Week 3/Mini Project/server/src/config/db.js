import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/task-manager';
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn('MongoDB connection failed, starting in-memory MongoDB server...');

    try {
      const mongoMemoryServer = await MongoMemoryServer.create();
      const mongoUri = mongoMemoryServer.getUri();
      const conn = await mongoose.connect(mongoUri);
      console.log(`MongoDB Connected via in-memory server: ${conn.connection.host}`);
    } catch (memoryError) {
      console.error('MongoDB connection error:', error.message);
      console.error('In-memory MongoDB startup error:', memoryError.message);
      process.exit(1);
    }
  }
};

export default connectDB;
