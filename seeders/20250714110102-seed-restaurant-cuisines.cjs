'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Get all restaurant IDs
    const restaurants = await queryInterface.sequelize.query(
      `SELECT id FROM restaurant;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // 2. Get all cuisine IDs
    const cuisines = await queryInterface.sequelize.query(
      `SELECT id FROM cuisine;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const restaurantIds = restaurants.map(r => r.id);
    const cuisineIds = cuisines.map(c => c.id);

    const restaurantCuisines = [];

    for (const restaurantId of restaurantIds) {
      // Pick 1–3 random cuisines for each restaurant
      const selectedCuisines = faker.helpers.arrayElements(cuisineIds, faker.number.int({ min: 1, max: 3 }));

      for (const cuisineId of selectedCuisines) {
        restaurantCuisines.push({ restaurantId, cuisineId });
      }
    }

    // Remove duplicate (restaurantId + cuisineId) combinations
    const uniquePairs = Array.from(new Set(
      restaurantCuisines.map(rc => `${rc.restaurantId}_${rc.cuisineId}`)
    )).map(pair => {
      const [restaurantId, cuisineId] = pair.split('_');
      return { restaurantId, cuisineId };
    });

    return queryInterface.bulkInsert('restaurant_cuisines', uniquePairs, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('restaurant_cuisines', null, {});
  }
};

const { faker } = require('@faker-js/faker');
