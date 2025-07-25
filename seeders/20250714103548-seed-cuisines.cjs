'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const cuisineNames = [
      'Desi',
      'Chinese',
      'Mexican',
      'Italian',
      'Turkish',
    ];

    const now = new Date();
    const cuisines = cuisineNames.map(name => ({
      id: uuidv4(),
      name,
      created_at: now,
      updated_at: now
    }));

    return queryInterface.bulkInsert('cuisine', cuisines, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cuisine', null, {});
  }
};