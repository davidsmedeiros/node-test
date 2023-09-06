'use strict';
const tableName = 'MainTable'
const columnName = 'new_id'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(tableName, columnName, {
      type: Sequelize.BIGINT,
      allowNull: true,
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(tableName, columnName)    
  }
};
