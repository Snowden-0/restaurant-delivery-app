'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('restaurant_cuisines', {
      restaurant_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      cuisine_id: {
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