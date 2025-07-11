'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Run a raw SQL query to install the "uuid-ossp" extension

    return Promise.all([
      queryInterface.sequelize.query(
        'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Run a raw SQL query to uninstall the "uuid-ossp" extension
    return Promise.all([
      queryInterface.sequelize.query(
        'DROP EXTENSION IF EXISTS "uuid-ossp";'
      )
    ]);
  }
};