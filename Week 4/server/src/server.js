import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const app = express();
app.use(cors()); app.use(express.json());
app.get('/api/health', (req, res) => res.json({ message: 'My Store API is running' }));
app.use('/api/auth', authRoutes); app.use('/api/products', productRoutes); app.use('/api/orders', orderRoutes);
app.use(notFound); app.use(errorHandler);
const port = process.env.PORT || 5000;
connectDB().then(() => app.listen(port, () => console.log(`API listening on port ${port}`))).catch((error) => {
	console.error(`MongoDB connection failed: ${error.message}`);
	console.error('Start MongoDB or set MONGODB_URI in server/.env, then restart the server.');
	process.exit(1);
});