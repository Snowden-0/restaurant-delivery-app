'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('menu_item', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      restaurant_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    });
  },

  async down(queryInterface /*, Sequelize */) {
    await queryInterface.dropTable('menu_item');
  },
};