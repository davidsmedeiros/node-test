'use strict';
const functionName = 'set_old_main_table_id'
const oldColumnName = 'old_main_table_id'
const originalColumnName = 'main_table_id'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      CREATE FUNCTION ${functionName}() RETURNS TRIGGER AS
      $BODY$
      BEGIN
          NEW.${oldColumnName} = NEW.${originalColumnName};
          RETURN NEW;
      END
      $BODY$ LANGUAGE PLPGSQL;
    `)
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      DROP FUNCTION ${functionName}();
    `)
  }
};
