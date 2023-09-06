'use strict';
const tableName = 'MainTable'
const newColumn = 'new_id'
const oldColumn = 'old_id'
const functionName = 'set_old_id'
const triggerName = `${tableName}_set_old_id_trigger`

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      BEGIN TRANSACTION;
      LOCK TABLE "${tableName}" IN EXCLUSIVE MODE;
    
      ALTER TABLE "${tableName}" DROP CONSTRAINT "${tableName}_pkey", ADD CONSTRAINT "${tableName}_pkey" PRIMARY KEY USING INDEX "${newColumn}_unique";
    
      ALTER SEQUENCE public."MainTable_id_seq" OWNED BY "${tableName}".id;
      ALTER TABLE "${tableName}" ALTER COLUMN ${newColumn} SET DEFAULT nextval('public."MainTable_id_seq"');
    
      DROP TRIGGER IF EXISTS ${tableName}_set_new_id_trigger ON "${tableName}";
    
      ALTER TABLE "${tableName}" RENAME COLUMN id TO ${oldColumn};
      ALTER TABLE "${tableName}" RENAME COLUMN ${newColumn} TO id;
      ALTER TABLE "${tableName}" ALTER COLUMN ${oldColumn} DROP DEFAULT;
    
      CREATE TRIGGER ${triggerName} BEFORE INSERT ON "${tableName}"
      FOR EACH ROW EXECUTE PROCEDURE ${functionName}();
    
      COMMIT;
    `)
  },

  async down (queryInterface, Sequelize) {

  }
};
