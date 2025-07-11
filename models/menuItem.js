// models/MenuItem.js
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class MenuItem extends Model {
    static associate(models) {
      // define associations here
    }
  }

  MenuItem.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    imageUrl: DataTypes.STRING,
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    category: DataTypes.STRING,
    restaurantId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'restaurant', key: 'id' }
    }
  }, {
    sequelize,
    modelName: 'MenuItem',
    tableName: 'menu_item',
    timestamps: false
  });

  return MenuItem;
};