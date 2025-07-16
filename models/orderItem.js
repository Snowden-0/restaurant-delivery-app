// models/OrderItem.js
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      // OrderItem.belongsTo(models.Order)
      // OrderItem.belongsTo(models.MenuItem)
    }
  }

  OrderItem.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'order', key: 'id' }
    },
    menu_item_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'menu_item', key: 'id' }
    }
  }, {
    sequelize,
    modelName: 'OrderItem',
    tableName: 'order_items',
    timestamps: false
  });

  return OrderItem;
};