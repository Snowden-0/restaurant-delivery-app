import { createOrderInTransaction, fetchOrdersByUserId, fetchOrderDetailById } from '../services/orderService.js';

const ORDER_SUCCESS = 'Order created successfully';
const GENERIC_ERROR = 'Something went wrong';
const AUTH_ERROR = 'Authentication required.';
const MISSING_ORDER_DATA = 'Missing required order data.';
const ORDER_NOT_FOUND_CONTROLLER = 'Order not found'; 
const NO_ORDERS_FOUND_CONTROLLER = 'No orders found for this user'; 
const UNAUTHORIZED_ACCESS_ORDERS = 'Unauthorized access to orders';
const UNAUTHORIZED_ACCESS_SINGLE_ORDER = 'Unauthorized access to this order';

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ message: AUTH_ERROR });
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
    return res.status(500).json({ message: error.message || GENERIC_ERROR });
  }
};

export const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    if (req.user.id !== userId) {
      return res.status(403).json({ message: UNAUTHORIZED_ACCESS_ORDERS });
    }

    const orders = await fetchOrdersByUserId(userId);

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: NO_ORDERS_FOUND_CONTROLLER });
    }

    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ message: error.message || GENERIC_ERROR });
  }
};

export const getOrderDetailById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id; 

    const orderDetail = await fetchOrderDetailById(orderId, userId);

    if (!orderDetail) {
      return res.status(404).json({ message: ORDER_NOT_FOUND_CONTROLLER });
    }
    if (orderDetail.user_id !== userId) {
        return res.status(403).json({ message: UNAUTHORIZED_ACCESS_SINGLE_ORDER });
    }

    return res.status(200).json({ order: orderDetail });
  } catch (error) {
    return res.status(500).json({ message: error.message || GENERIC_ERROR });
  }
};