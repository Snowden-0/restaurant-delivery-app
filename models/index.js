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
models.User.hasMany(models.Order, { foreignKey: 'user_id' });
models.Order.belongsTo(models.User, { foreignKey: 'user_id' });

// Restaurant Relationships
models.Restaurant.hasMany(models.MenuItem, { foreignKey: 'restaurant_id' });
models.MenuItem.belongsTo(models.Restaurant, { foreignKey: 'restaurant_id' });
models.Restaurant.hasMany(models.Order, { foreignKey: 'restaurant_id' });
models.Order.belongsTo(models.Restaurant, { foreignKey: 'restaurant_id' });

// Order Relationships
models.Order.hasMany(models.OrderItem, { foreignKey: 'order_id' });
models.OrderItem.belongsTo(models.Order, { foreignKey: 'order_id' });

models.Order.hasOne(models.Delivery, { foreignKey: 'order_id' });
models.Delivery.belongsTo(models.Order, { foreignKey: 'order_id' });

models.Order.hasOne(models.Payment, { foreignKey: 'order_id' });
models.Payment.belongsTo(models.Order, { foreignKey: 'order_id' });

models.Order.hasOne(models.Rating, { foreignKey: 'order_id' });
models.Rating.belongsTo(models.Order, { foreignKey: 'order_id' });

// Many-to-Many between Restaurant and Cuisine
models.Restaurant.belongsToMany(models.Cuisine, { through: models.RestaurantCuisine, foreignKey: 'restaurant_id' });
models.Cuisine.belongsToMany(models.Restaurant, { through: models.RestaurantCuisine, foreignKey: 'cuisine_id' });

// MenuItem and OrderItem relation
models.MenuItem.hasMany(models.OrderItem, { foreignKey: 'menu_item_id' });
models.OrderItem.belongsTo(models.MenuItem, { foreignKey: 'menu_item_id' });

// (Optional) Invoke associate method in each model file
Object.values(models)
  .filter((m) => typeof m.associate === 'function')
  .forEach((m) => m.associate(models));

export { sequelize };
export default models;
