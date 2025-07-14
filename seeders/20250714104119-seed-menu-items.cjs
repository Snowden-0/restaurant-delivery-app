'use strict';

const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');

const generateFoodName = () => {
  const adjectives = ['Spicy', 'Creamy', 'Grilled', 'Crispy', 'Roasted', 'Smoked', 'Sweet', 'Savory'];
  const mainIngredients = ['Chicken', 'Beef', 'Tofu', 'Paneer', 'Salmon', 'Mushroom', 'Pasta', 'Shrimp'];
  const dishes = ['Tacos', 'Burger', 'Curry', 'Pizza', 'Wrap', 'Sandwich', 'Salad', 'Rice Bowl'];

  return `${faker.helpers.arrayElement(adjectives)} ${faker.helpers.arrayElement(mainIngredients)} ${faker.helpers.arrayElement(dishes)}`;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const restaurants = await queryInterface.sequelize.query(
      `SELECT id FROM restaurant;`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const restaurantIds = restaurants.map(r => r.id);

    const categories = ['Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Side Dish'];

    const menuItems = Array.from({ length: 20 }).map(() => ({
      id: uuidv4(),
      name: generateFoodName(),
      description: faker.lorem.sentence(),
      price: parseFloat(faker.commerce.price({ min: 5, max: 50 })),
      imageUrl: null,
      isAvailable: faker.datatype.boolean(),
      category: faker.helpers.arrayElement(categories),
      restaurantId: faker.helpers.arrayElement(restaurantIds)
    }));

    return queryInterface.bulkInsert('menu_item', menuItems, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('menu_item', null, {});
  }
};
