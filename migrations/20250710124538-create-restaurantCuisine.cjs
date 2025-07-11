'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('restaurant_cuisines', {
      restaurantId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      cuisineId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
    });
  },

  async down(queryInterface /*, Sequelize */) {
    await queryInterface.dropTable('restaurant_cuisines');
  },
};