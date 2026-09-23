import mongoose from 'mongoose';

export default async function connectDB() {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is missing. Copy server/.env.example to server/.env.');
  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
  console.log('MongoDB connected');
}