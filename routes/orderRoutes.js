import express from 'express';
import { createOrder, getOrdersByUserId, getOrderDetailById } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js'; 

const router = express.Router();


router.post('/', protect, createOrder);
router.get('/user/:userId', protect, getOrdersByUserId);
router.get('/:orderId', protect, getOrderDetailById);

export default router;