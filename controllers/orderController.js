import { createOrderInTransaction } from '../services/orderService.js';

const ORDER_SUCCESS = 'Order created successfully';
const GENERIC_ERROR = 'Something went wrong';
const AUTH_ERROR = 'Authentication required.';
const MISSING_ORDER_DATA = 'Missing required order data.';

export const createOrder = async (req, res) => {
  try {

    const userId = req.user.id; 
    if (!userId) {
      return res.status(401).json({ message: AUTH_ERROR});
    }

    const { restaurantId, totalAmount, paymentMethod, items } = req.body;

    if (!restaurantId || !totalAmount || !paymentMethod || !items || items.length === 0) {
      return res.status(400).json({ message: MISSING_ORDER_DATA });
    }
    const orderData = {
      userId,
      restaurantId,
      totalAmount,
      paymentMethod,
      items,
    };
    
    const newOrder = await createOrderInTransaction(orderData);

    return res.status(201).json({ message: ORDER_SUCCESS, order: newOrder });

  } catch (error) {
    return res.status(500).json({ message: error.message ||  GENERIC_ERROR });
  }
};
