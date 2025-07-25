import express from 'express';
import { createOrder } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js'; 

const router = express.Router();


router.post('/', protect, createOrder);

export default router;