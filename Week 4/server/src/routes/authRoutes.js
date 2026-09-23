import { Router } from 'express';
import { login, profile, register, getUserCount } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, profile);
router.get('/users/count', protect, adminOnly, getUserCount);

export default router;