'use strict';

const { v4: uuidv4 } = require('uuid');
const { faker }       = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const restaurants = Array.from({ length: 20 }).map(() => ({
      id:          uuidv4(),
      name:        faker.company.name(),
      address:     `${faker.location.streetAddress()}, ${faker.location.city()}`,
      // phone must start with '0' then 10 random digits (e.g. '0##########')
      phone:       faker.helpers.replaceSymbols('0##########', '#'),
      description: faker.lorem.sentences(2),
      // force imageUrl to null
      imageUrl:    null,
      isAvailable: faker.datatype.boolean(),
      createdAt:   new Date(),
      updatedAt:   new Date()
    }));

    return queryInterface.bulkInsert('restaurant', restaurants, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('restaurant', null, {});
  }
};
