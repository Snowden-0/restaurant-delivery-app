import express from 'express';
import { createRating } from '../controllers/RatingController.js';
import { protect } from '../middleware/authMiddleware.js'; 

const router = express.Router();

router.post('/:orderId/rating', protect, createRating);

export default router;
