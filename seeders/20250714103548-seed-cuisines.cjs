'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const cuisineNames = [
      'Italian',
      'Chinese',
      'Mexican',
      'Indian',
      'Thai',
      'American',
      'Japanese',
      'Mediterranean',
      'French',
      'Korean',
      'Vietnamese',
      'Turkish',
      'Spanish',
      'Greek',
      'Lebanese'
    ];

    const cuisines = cuisineNames.map(name => ({
      id: uuidv4(),
      name
    }));

    return queryInterface.bulkInsert('cuisine', cuisines, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cuisine', null, {});
  }
};
