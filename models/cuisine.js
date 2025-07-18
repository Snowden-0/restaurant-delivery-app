// models/Cuisine.js
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Cuisine extends Model {
    static associate(models) {
      // define associations here
    }
  }

  Cuisine.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Cuisine',
    tableName: 'cuisine',
    timestamps: false,
    paranoid: true
  });

  return Cuisine;
};
