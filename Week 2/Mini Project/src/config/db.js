const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let memoryServer;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log('Local MongoDB not available, starting in-memory MongoDB server...');

    try {
      memoryServer = await MongoMemoryServer.create();
      const mongoUri = memoryServer.getUri();
      const conn = await mongoose.connect(mongoUri);
      console.log(`MongoDB connected via in-memory server: ${conn.connection.host}`);
    } catch (memoryError) {
      console.error('MongoDB connection failed:', memoryError.message);
      process.exit(1);
    }
  }
};

process.on('SIGINT', async () => {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
  }
  process.exit(0);
});

module.exports = connectDB;
