// models/Payment.js
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Payment extends Model {
    static associate(models) {
      // Payment.belongsTo(models.Order)
    }
  }

  Payment.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    method: {
      type: DataTypes.ENUM('card', 'cash_on_delivery'),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('completed', 'failed'),
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'order', key: 'id' }
    }
  }, {
    sequelize,
    modelName: 'Payment',
    tableName: 'payments',
    timestamps: false
  });

  return Payment;
};
