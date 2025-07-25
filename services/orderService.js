import sequelize from '../config/database.js';
import { QueryTypes } from 'sequelize';

export const createOrderInTransaction = async (orderData) => {
  const transaction = await sequelize.transaction();

  try {
    const { userId, restaurantId, totalAmount, paymentMethod, items } = orderData;

    // 1. Create the Order
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
      `('${item.menuItemId}', '${orderId}', ${item.quantity})`
    ).join(',');

    const orderItemsQuery = `
      INSERT INTO "order_item" (menu_item_id, order_id, quantity, created_at, updated_at)
      VALUES ${orderItemValues}, NOW(), NOW();
    `;
    await sequelize.query(orderItemsQuery, {
      type: QueryTypes.INSERT,
      transaction: transaction,
    });

    // 3. Create the Payment
    const paymentQuery = `
      INSERT INTO "payment" (order_id, amount, method, status, created_at, updated_at)
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
    console.error('Failed to create order:', error);
    throw new Error('Order creation failed due to a database error.');
  }
};
