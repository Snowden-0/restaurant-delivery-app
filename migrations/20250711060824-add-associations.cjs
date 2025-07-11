'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // We're wrapping all promises in a Promise.all to run them concurrently for efficiency.
    // However, if you have dependencies between these constraints, you should run them sequentially.
    // In this case, the order doesn't matter as all tables have been created.
    return Promise.all([
      // Foreign key for 'order' table
      queryInterface.addConstraint('order', {
        fields: ['userId'],
        type: 'foreign key',
        name: 'fk_order_user_id', // optional, but recommended for clarity
        references: {
          table: 'user',
          field: 'id',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),
      queryInterface.addConstraint('order', {
        fields: ['restaurantId'],
        type: 'foreign key',
        name: 'fk_order_restaurant_id',
        references: {
          table: 'restaurant',
          field: 'id',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),

      // Foreign keys for 'deliveries' table
      queryInterface.addConstraint('deliveries', {
        fields: ['orderId'],
        type: 'foreign key',
        name: 'fk_deliveries_order_id',
        references: {
          table: 'order',
          field: 'id',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),

      // Foreign keys for 'payments' table
      queryInterface.addConstraint('payments', {
        fields: ['orderId'],
        type: 'foreign key',
        name: 'fk_payments_order_id',
        references: {
          table: 'order',
          field: 'id',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),

      // Foreign keys for 'ratings' table
      queryInterface.addConstraint('ratings', {
        fields: ['orderId'],
        type: 'foreign key',
        name: 'fk_ratings_order_id',
        references: {
          table: 'order',
          field: 'id',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),

      // Foreign keys for 'restaurant_cuisines' table
      queryInterface.addConstraint('restaurant_cuisines', {
        fields: ['restaurantId'],
        type: 'foreign key',
        name: 'fk_restaurant_cuisines_restaurant_id',
        references: {
          table: 'restaurant',
          field: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      queryInterface.addConstraint('restaurant_cuisines', {
        fields: ['cuisineId'],
        type: 'foreign key',
        name: 'fk_restaurant_cuisines_cuisine_id',
        references: {
          table: 'cuisine',
          field: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),

      // Foreign keys for 'order_items' table
      queryInterface.addConstraint('order_items', {
        fields: ['orderId'],
        type: 'foreign key',
        name: 'fk_order_items_order_id',
        references: {
          table: 'order',
          field: 'id',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),
      queryInterface.addConstraint('order_items', {
        fields: ['menuItemId'],
        type: 'foreign key',
        name: 'fk_order_items_menu_item_id',
        references: {
          table: 'menu_item',
          field: 'id',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),

      // Foreign keys for 'menu_item' table
      queryInterface.addConstraint('menu_item', {
        fields: ['restaurantId'],
        type: 'foreign key',
        name: 'fk_menu_item_restaurant_id',
        references: {
          table: 'restaurant',
          field: 'id',
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    // The 'down' method should remove the constraints in the reverse order of their creation,
    // though with Promise.all it's less critical.
    return Promise.all([
      queryInterface.removeConstraint('order', 'fk_order_user_id'),
      queryInterface.removeConstraint('order', 'fk_order_restaurant_id'),
      queryInterface.removeConstraint('deliveries', 'fk_deliveries_order_id'),
      queryInterface.removeConstraint('payments', 'fk_payments_order_id'),
      queryInterface.removeConstraint('ratings', 'fk_ratings_order_id'),
      queryInterface.removeConstraint('restaurant_cuisines', 'fk_restaurant_cuisines_restaurant_id'),
      queryInterface.removeConstraint('restaurant_cuisines', 'fk_restaurant_cuisines_cuisine_id'),
      queryInterface.removeConstraint('order_items', 'fk_order_items_order_id'),
      queryInterface.removeConstraint('order_items', 'fk_order_items_menu_item_id'),
      queryInterface.removeConstraint('menu_item', 'fk_menu_item_restaurant_id'),
    ]);
  },
};