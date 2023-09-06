'use strict';
const tableName = 'MainTable'
const triggerName = `${tableName}_set_old_id_trigger`
const oldColumn = 'old_id'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      BEGIN TRANSACTION;
      LOCK TABLE "${tableName}" IN EXCLUSIVE MODE;
      
      ALTER SEQUENCE public."MainTable_id_seq" OWNED BY "${tableName}".id;

      DROP TRIGGER IF EXISTS ${triggerName} ON "${tableName}";
      
      ALTER TABLE "${tableName}" DROP COLUMN ${oldColumn};
      
      COMMIT;
  `)
  },

  async down (queryInterface, Sequelize) {

  }
};
