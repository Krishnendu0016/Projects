import { Router } from 'express';
import { createOrder, getAllOrders, getMyOrders, getOrder, updateOrderStatus } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';
const router = Router();
router.use(protect); router.post('/', createOrder); router.get('/my-orders', getMyOrders); router.get('/', adminOnly, getAllOrders); router.get('/:id', getOrder); router.put('/:id/status', adminOnly, updateOrderStatus);
export default router;