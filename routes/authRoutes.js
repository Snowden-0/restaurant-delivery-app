import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected route example
router.get('/profile', protect, (req, res) => {
  // Because of the 'protect' middleware, req.user is available here
  res.status(200).json({
    message: "Welcome to your profile!",
    user: req.user
  });
});

export default router;