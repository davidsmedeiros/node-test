'use strict';
const tableName = 'EdgeTable1'
const newColumn = 'new_main_table_id'
const oldColumn = 'old_main_table_id'
const functionName = 'set_old_main_table_id'
const oldFunctionName = 'set_new_main_table_id'
const triggerName = `${tableName}_set_old_main_table_id_trigger`

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      BEGIN TRANSACTION;
      LOCK TABLE "${tableName}" IN EXCLUSIVE MODE;
      DROP TRIGGER IF EXISTS ${tableName}_${oldFunctionName}_trigger ON "${tableName}";
      ALTER TABLE "${tableName}" RENAME COLUMN main_table_id TO ${oldColumn};
      ALTER TABLE "${tableName}" RENAME COLUMN ${newColumn} TO main_table_id;
      CREATE TRIGGER ${triggerName} BEFORE INSERT ON "${tableName}"
      FOR EACH ROW EXECUTE PROCEDURE ${functionName}();
      COMMIT;
    `)
  },

  async down (queryInterface, Sequelize) {

  }
};
