'use strict';
const tableName = 'EdgeTable1'
const columnName = 'new_main_table_id'

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
