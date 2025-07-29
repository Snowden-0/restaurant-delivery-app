import sequelize from '../config/database.js';
import { QueryTypes } from 'sequelize';

const ERROR_FAILED_CREATE_ORDER = 'Failed to create order';
const ERROR_FAILED_FETCH_ORDERS = 'Failed to fetch orders';
const ERROR_FAILED_FETCH_ORDER_DETAIL = 'Failed to fetch order detail';


export const createOrderInTransaction = async (orderData) => {
  const transaction = await sequelize.transaction();

  try {
    const { userId, restaurantId, totalAmount, paymentMethod, items } = orderData;

    const orderQuery = `
      INSERT INTO "order" (user_id, restaurant_id, total_amount, status, created_at, updated_at)
      VALUES (:userId, :restaurantId, :totalAmount, 'pending', NOW(), NOW())
      RETURNING id, status, total_amount;
    `;
    const [newOrder] = await sequelize.query(orderQuery, {
      replacements: { userId, restaurantId, totalAmount },
      type: QueryTypes.INSERT,
      transaction: transaction,
    });

    const orderId = newOrder[0].id;

    const orderItemValues = items.map(item =>
      `('${item.menuItemId}', '${orderId}', ${item.quantity}, NOW(), NOW())`
    ).join(',');

    const orderItemsQuery = `
      INSERT INTO "order_items" (menu_item_id, order_id, quantity, created_at, updated_at)
      VALUES ${orderItemValues};
    `;
    await sequelize.query(orderItemsQuery, {
      type: QueryTypes.INSERT,
      transaction: transaction,
    });

    const paymentQuery = `
      INSERT INTO "payments" (order_id, amount, method, status, created_at, updated_at)
      VALUES (:orderId, :amount, :method, 'completed', NOW(), NOW())
      RETURNING id, status;
    `;
    await sequelize.query(paymentQuery, {
      replacements: {
        orderId: orderId,
        amount: totalAmount,
        method: paymentMethod,
      },
      type: QueryTypes.INSERT,
      transaction: transaction,
    });

    await transaction.commit();

    return newOrder[0];

  } catch (error) {
    await transaction.rollback();
    throw new Error(ERROR_FAILED_CREATE_ORDER);
  }
};

export const fetchOrdersByUserId = async (userId) => {
  try {
    const ordersQuery = `
      SELECT
        o.id,
        o.total_amount,
        o.status,
        o.created_at,
        r.name AS restaurant_name
      FROM "order" AS o
      LEFT JOIN "restaurant" AS r ON o.restaurant_id = r.id
      WHERE o.user_id = :userId
      ORDER BY o.created_at DESC;
    `;
    const orders = await sequelize.query(ordersQuery, {
      replacements: { userId },
      type: QueryTypes.SELECT,
    });
    return orders;
  } catch (error) {
    throw new Error(ERROR_FAILED_FETCH_ORDERS);
  }
};

export const fetchOrderDetailById = async (orderId, userId) => {
  try {
    const orderDetailQuery = `
      SELECT
        o.id,
        o.user_id,
        o.total_amount,
        o.status,
        o.created_at,
        r.name AS restaurant_name,
        r.address AS restaurant_address,
        p.method AS payment_method,
        p.status AS payment_status
      FROM "order" AS o
      LEFT JOIN "restaurant" AS r ON o.restaurant_id = r.id
      LEFT JOIN "payments" AS p ON o.id = p.order_id
      WHERE o.id = :orderId AND o.user_id = :userId;
    `;
    const [order] = await sequelize.query(orderDetailQuery, {
      replacements: { orderId, userId },
      type: QueryTypes.SELECT,
    });

    if (!order) {
      return null;
    }

    const orderItemsQuery = `
      SELECT
        oi.quantity,
        mi.name AS menu_item_name,
        mi.price AS menu_item_price
      FROM "order_items" AS oi
      LEFT JOIN "menu_item" AS mi ON oi.menu_item_id = mi.id
      WHERE oi.order_id = :orderId;
    `;
    const items = await sequelize.query(orderItemsQuery, {
      replacements: { orderId },
      type: QueryTypes.SELECT,
    });

    return { ...order, items };
  } catch (error) {
    throw new Error(ERROR_FAILED_FETCH_ORDER_DETAIL);
  }
};