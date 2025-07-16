// models/RestaurantCuisine.js
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class RestaurantCuisine extends Model {
    static associate(models) {
      // define associations here
    }
  }

  RestaurantCuisine.init({
    restaurant_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: { model: 'restaurant', key: 'id' }
    },
    cuisine_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: { model: 'cuisine', key: 'id' }
    }
  }, {
    sequelize,
    modelName: 'RestaurantCuisine',
    tableName: 'restaurant_cuisines',
    timestamps: false
  });

  return RestaurantCuisine;
};