'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_items', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      order_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      menu_item_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    });
  },

  async down(queryInterface /*, Sequelize */) {
    await queryInterface.dropTable('order_items');
  },
};