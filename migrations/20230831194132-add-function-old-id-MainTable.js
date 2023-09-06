'use strict';
const functionName = 'set_old_id'
const oldColumnName = 'old_id'
const originalColumnName = 'id'

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
      DROP FUNCTION ${functionName};
    `)
  }
};
