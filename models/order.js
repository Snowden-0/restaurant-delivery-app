// models/Order.js
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // Order.belongsTo(models.User)
      // Order.belongsTo(models.Restaurant)
      // Order.hasMany(models.OrderItem)
      // Order.hasOne(models.Delivery)
      // Order.hasOne(models.Rating)
      // Order.hasOne(models.Payment)
    }
  }

  Order.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'preparing', 'on_the_way', 'delivered', 'cancelled'),
      defaultValue: 'delivered'
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'user', key: 'id' }
    },
    restaurant_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'restaurant', key: 'id' }
    }
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'order',
    timestamps: true,
    paranoid: true
  });

  return Order;
};