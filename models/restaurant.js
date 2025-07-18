// models/Restaurant.js
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Restaurant extends Model {
    static associate(models) {
      // define associations here
    }
  }

  Restaurant.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    image_url: DataTypes.STRING,
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Restaurant',
    tableName: 'restaurant',
    timestamps: true,
    paranoid: true,
  });

  return Restaurant;
};