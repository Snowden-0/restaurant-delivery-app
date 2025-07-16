'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('deliveries', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      driver_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      driver_phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      order_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });
  },

  async down(queryInterface /*, Sequelize */) {
    await queryInterface.dropTable('deliveries');
  },
};
