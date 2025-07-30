import { createRatingById } from '../services/ratingService.js';

const RATING_SUCCESS = 'Rating created successfully';
const GENERIC_ERROR = 'Something went wrong';
const AUTH_ERROR = 'Authentication required.';
const MISSING_RATING_DATA = 'Missing required order ID for rating.';
const INVALID_RATING_VALUE = 'Rating must be a number between 1 and 5, or not provided.';

export const createRating = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ message: AUTH_ERROR });
    }

    const { orderId } = req.params; 
    const { rating, comment } = req.body;

    if (!orderId) {
      return res.status(400).json({ message: MISSING_RATING_DATA });
    }

    if (rating !== undefined && (typeof rating !== 'number' || rating < 1 || rating > 5)) {
      return res.status(400).json({ message: INVALID_RATING_VALUE });
    }

    if (rating === undefined && comment === undefined) {
        return res.status(400).json({ message: 'At least rating or comment must be provided.' });
    }

    const newRating = await createRatingById(orderId, userId, rating, comment);

    return res.status(201).json({ message: RATING_SUCCESS, rating: newRating });
  } catch (error) {
   
    if (error.message.includes('Order not found') || error.message.includes('unauthorized')) {
      return res.status(403).json({ message: error.message });
    }
    if (error.message.includes('Rating already exists')) {
      return res.status(409).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message || GENERIC_ERROR });
  }
};
