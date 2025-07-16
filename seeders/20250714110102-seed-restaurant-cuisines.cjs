'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Get all restaurant IDs
    const restaurants = await queryInterface.sequelize.query(
      `SELECT id FROM restaurant;`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const restaurantIds = restaurants.map(r => r.id);

    // 2. Get all cuisine IDs
    const cuisines = await queryInterface.sequelize.query(
      `SELECT id FROM cuisine;`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const cuisineIds = cuisines.map(c => c.id);

    // 3. Build restaurant-cuisine pairs
    const restaurantCuisines = [];
    for (const restaurantId of restaurantIds) {
      // Pick 1–3 random cuisines for each restaurant
      const selectedCuisines = faker.helpers.arrayElements(
        cuisineIds,
        faker.number.int({ min: 1, max: 3 })
      );
      for (const cuisineId of selectedCuisines) {
        // Use snake_case to match DB column names
        restaurantCuisines.push({ restaurant_id: restaurantId, cuisine_id: cuisineId });
      }
    }

    // 4. Remove duplicate combinations
    const uniqueRows = Array.from(
      new Map(
        restaurantCuisines.map(row => [
          `${row.restaurant_id}_${row.cuisine_id}`,
          row
        ])
      ).values()
    );

    // 5. Bulk insert into restaurant_cuisines
    return queryInterface.bulkInsert('restaurant_cuisines', uniqueRows, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('restaurant_cuisines', null, {});
  }
};
