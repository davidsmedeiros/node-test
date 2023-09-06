'use strict';
const tableName = 'MainTable'
const newColumnName = 'new_id'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.resolve()
      .then(() => queryInterface.sequelize.query(`
        CREATE UNIQUE INDEX CONCURRENTLY IF NOT EXISTS ${newColumnName}_unique ON "${tableName}"(${newColumnName})
      `))
      .then(() => queryInterface.sequelize.query(`
        ALTER TABLE "${tableName}" ADD CONSTRAINT ${newColumnName}_not_null CHECK (${newColumnName} IS NOT NULL) NOT VALID;
      `))
      .then(() => queryInterface.sequelize.query(`
        ALTER TABLE "${tableName}" VALIDATE CONSTRAINT ${newColumnName}_not_null;
      `))
  },

  async down (queryInterface, Sequelize) {

  }
};
