// models/Delivery.js
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Delivery extends Model {
    static associate(models) {
      // Delivery.belongsTo(models.Order)
    }
  }

  Delivery.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    driverName: DataTypes.STRING,
    driverPhone: DataTypes.STRING,
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: { model: 'order', key: 'id' }
    }
  }, {
    sequelize,
    modelName: 'Delivery',
    tableName: 'deliveries',
    timestamps: true
  });

  return Delivery;
};