// models/index.js
import { Sequelize, DataTypes } from 'sequelize';
import defineUser from './user.js';
import defineRestaurant from './restaurant.js';
import defineCuisine from './cuisine.js';
import defineRestaurantCuisine from './restaurantCuisine.js';
import defineMenuItem from './menuItem.js';
import defineOrder from './order.js';
import defineOrderItem from './orderItem.js';
import defineDelivery from './delivery.js';
import definePayment from './payment.js';
import defineRating from './rating.js';

// Initialize Sequelize instance (adjust config as needed)
const sequelize = new Sequelize(process.env.DB_NAME, {
  dialect: 'postgres',
  logging: false,
});

// Define models
toString; const models = {};
models.User = defineUser(sequelize, DataTypes);
models.Restaurant = defineRestaurant(sequelize, DataTypes);
models.Cuisine = defineCuisine(sequelize, DataTypes);
models.RestaurantCuisine = defineRestaurantCuisine(sequelize, DataTypes);
models.MenuItem = defineMenuItem(sequelize, DataTypes);
models.Order = defineOrder(sequelize, DataTypes);
models.OrderItem = defineOrderItem(sequelize, DataTypes);
models.Delivery = defineDelivery(sequelize, DataTypes);
models.Payment = definePayment(sequelize, DataTypes);
models.Rating = defineRating(sequelize, DataTypes);

// Set up associations
// User (Customer) Relationships
models.User.hasMany(models.Order, { foreignKey: 'userId' });
models.Order.belongsTo(models.User, { foreignKey: 'userId' });

// Restaurant Relationships
models.Restaurant.hasMany(models.MenuItem, { foreignKey: 'restaurantId' });
models.MenuItem.belongsTo(models.Restaurant, { foreignKey: 'restaurantId' });
models.Restaurant.hasMany(models.Order, { foreignKey: 'restaurantId' });
models.Order.belongsTo(models.Restaurant, { foreignKey: 'restaurantId' });

// Order Relationships
models.Order.hasMany(models.OrderItem, { foreignKey: 'orderId' });
models.OrderItem.belongsTo(models.Order, { foreignKey: 'orderId' });

models.Order.hasOne(models.Delivery, { foreignKey: 'orderId' });
models.Delivery.belongsTo(models.Order, { foreignKey: 'orderId' });

models.Order.hasOne(models.Payment, { foreignKey: 'orderId' });
models.Payment.belongsTo(models.Order, { foreignKey: 'orderId' });

models.Order.hasOne(models.Rating, { foreignKey: 'orderId' });
models.Rating.belongsTo(models.Order, { foreignKey: 'orderId' });

// Many-to-Many between Restaurant and Cuisine
models.Restaurant.belongsToMany(models.Cuisine, { through: models.RestaurantCuisine, foreignKey: 'restaurantId' });
models.Cuisine.belongsToMany(models.Restaurant, { through: models.RestaurantCuisine, foreignKey: 'cuisineId' });

// MenuItem and OrderItem relation
models.MenuItem.hasMany(models.OrderItem, { foreignKey: 'menuItemId' });
models.OrderItem.belongsTo(models.MenuItem, { foreignKey: 'menuItemId' });

// (Optional) Invoke associate method in each model file
Object.values(models)
  .filter((m) => typeof m.associate === 'function')
  .forEach((m) => m.associate(models));

export { sequelize };
export default models;
