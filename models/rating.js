// models/Rating.js
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      // Rating.belongsTo(models.Order)
    }
  }

  Rating.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: DataTypes.TEXT,
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: { model: 'order', key: 'id' }
    }
  }, {
    sequelize,
    modelName: 'Rating',
    tableName: 'ratings',
    timestamps: true
  });

  return Rating;
};
