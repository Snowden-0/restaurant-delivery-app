'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      // Deliveries -> Order
      await queryInterface.addConstraint('deliveries', {
        fields: ['orderId'],
        type: 'foreign key',
        name: 'FK_deliveries_order',
        references: {
          table: 'order',
          field: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        transaction
      });

      // Payments -> Order
      await queryInterface.addConstraint('payments', {
        fields: ['orderId'],
        type: 'foreign key',
        name: 'FK_payments_order',
        references: {
          table: 'order',
          field: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        transaction
      });

      // Ratings -> Order
      await queryInterface.addConstraint('ratings', {
        fields: ['orderId'],
        type: 'foreign key',
        name: 'FK_ratings_order',
        references: {
          table: 'order',
          field: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        transaction
      });

      // Order -> User
      await queryInterface.addConstraint('order', {
        fields: ['userId'],
        type: 'foreign key',
        name: 'FK_order_user',
        references: {
          table: 'user',
          field: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        transaction
      });

      // Order -> Restaurant
      await queryInterface.addConstraint('order', {
        fields: ['restaurantId'],
        type: 'foreign key',
        name: 'FK_order_restaurant',
        references: {
          table: 'restaurant',
          field: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        transaction
      });

      // Order Items -> Order
      await queryInterface.addConstraint('order_items', {
        fields: ['orderId'],
        type: 'foreign key',
        name: 'FK_order_items_order',
        references: {
          table: 'order',
          field: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        transaction
      });

      // Order Items -> Menu Item
      await queryInterface.addConstraint('order_items', {
        fields: ['menuItemId'],
        type: 'foreign key',
        name: 'FK_order_items_menu_item',
        references: {
          table: 'menu_item',
          field: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        transaction
      });

      // Menu Item -> Restaurant
      await queryInterface.addConstraint('menu_item', {
        fields: ['restaurantId'],
        type: 'foreign key',
        name: 'FK_menu_item_restaurant',
        references: {
          table: 'restaurant',
          field: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        transaction
      });

      // Restaurant Cuisines -> Restaurant
      await queryInterface.addConstraint('restaurant_cuisines', {
        fields: ['restaurantId'],
        type: 'foreign key',
        name: 'FK_restaurant_cuisines_restaurant',
        references: {
          table: 'restaurant',
          field: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        transaction
      });

      // Restaurant Cuisines -> Cuisine
      await queryInterface.addConstraint('restaurant_cuisines', {
        fields: ['cuisineId'],
        type: 'foreign key',
        name: 'FK_restaurant_cuisines_cuisine',
        references: {
          table: 'cuisine',
          field: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        transaction
      });
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      const constraintNames = [
        'FK_deliveries_order',
        'FK_payments_order',
        'FK_ratings_order',
        'FK_order_user',
        'FK_order_restaurant',
        'FK_order_items_order',
        'FK_order_items_menu_item',
        'FK_menu_item_restaurant',
        'FK_restaurant_cuisines_restaurant',
        'FK_restaurant_cuisines_cuisine'
      ];
      
      for (const constraintName of constraintNames) {
        try {
          await queryInterface.removeConstraint(
            constraintName.includes('_restaurant_cuisines_') 
              ? 'restaurant_cuisines' 
              : constraintName.split('_')[1],
            constraintName,
            { transaction }
          );
        } catch (err) {
          console.warn(`Constraint ${constraintName} doesn't exist, skipping`);
        }
      }
    });
  }
};