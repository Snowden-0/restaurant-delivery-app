'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ratings', {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      comment: {
        type: DataTypes.TEXT,
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
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      }
    });
  },

  async down(queryInterface /*, Sequelize */) {
    await queryInterface.dropTable('ratings');
  },
};
