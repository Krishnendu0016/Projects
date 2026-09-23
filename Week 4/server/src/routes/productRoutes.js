import { Router } from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';
const router = Router();
router.get('/', getProducts); router.get('/:id', getProduct);
router.post('/', protect, adminOnly, createProduct); router.put('/:id', protect, adminOnly, updateProduct); router.delete('/:id', protect, adminOnly, deleteProduct);
export default router;