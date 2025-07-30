import sequelize from '../config/database.js';
import { QueryTypes } from 'sequelize';

const ERROR_FAILED_CREATE_RATING = 'Failed to create rating';
const ERROR_ORDER_NOT_FOUND_OR_UNAUTHORIZED = 'Order not found or unauthorized to rate this order';

export const createRatingById = async (orderId, userId, rating, comment) => {
  try {
    const orderVerificationQuery = `
      SELECT id FROM "order"
      WHERE id = :orderId AND user_id = :userId;
    `;
    const [order] = await sequelize.query(orderVerificationQuery, {
      replacements: { orderId, userId },
      type: QueryTypes.SELECT,
    });

    if (!order || order.length === 0) {
      throw new Error(ERROR_ORDER_NOT_FOUND_OR_UNAUTHORIZED);
    }

    const existingRatingQuery = `
      SELECT id FROM "ratings"
      WHERE order_id = :orderId;
    `;
    const [existingRating] = await sequelize.query(existingRatingQuery, {
      replacements: { orderId },
      type: QueryTypes.SELECT,
    });

    let ratingResult;

    if (existingRating && existingRating.length > 0) {
      throw new Error(ERROR_RATING_ALREADY_EXISTS);
    }
      
    if (!rating && !comment) {
      throw new Error('At least rating or comment must be provided to create a new rating.');
    }

      const createRatingQuery = `
        INSERT INTO "ratings" (order_id, rating, comment, created_at, updated_at)
        VALUES (:orderId, :rating, :comment, NOW(), NOW())
        RETURNING id, order_id, rating, comment, created_at, updated_at;
      `;
      const [newRating] = await sequelize.query(createRatingQuery, {
        replacements: { orderId, rating: rating || null, comment: comment || null },
        type: QueryTypes.INSERT,
      });
      ratingResult = newRating[0];
  

    return ratingResult;

  } catch (error) {
    console.error('Error in createOrUpdateRating:', error.message);
    throw new Error(error.message || ERROR_FAILED_CREATE_RATING);
  }
};
