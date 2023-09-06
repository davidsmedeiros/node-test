'use strict';
const tableName = 'MainTable'
const originalIdColumn = 'id'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.resolve()
      .then(() => queryInterface.sequelize.query(`
        CREATE UNIQUE INDEX CONCURRENTLY IF NOT EXISTS id_unique ON "${tableName}"(${originalIdColumn})
      `))
      .then(() => queryInterface.sequelize.query(`
        ALTER TABLE "${tableName}" ADD CONSTRAINT id_not_null CHECK (${originalIdColumn} IS NOT NULL) NOT VALID;
      `))
      .then(() => queryInterface.sequelize.query(`
        ALTER TABLE "${tableName}" VALIDATE CONSTRAINT id_not_null;
      `))
  },

  async down (queryInterface, Sequelize) {

  }
};
