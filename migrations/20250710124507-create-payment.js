'use strict';
import { DataTypes } from 'sequelize';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('payments', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    method: {
      type: DataTypes.ENUM('card', 'cash_on_delivery'),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('completed', 'failed'),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'order',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('payments');

  // Clean up ENUM types (optional, but recommended for Postgres)
  await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_payments_method";');
  await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_payments_status";');
}
