'use strict';
const tableName = 'MainTable'
const functionName = 'set_new_id'
const triggerName = `${tableName}_set_new_id_trigger`

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      CREATE TRIGGER ${triggerName} BEFORE INSERT ON "${tableName}"
      FOR EACH ROW EXECUTE PROCEDURE ${functionName}();
    `)
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS ${triggerName};
    `)
  }
};
