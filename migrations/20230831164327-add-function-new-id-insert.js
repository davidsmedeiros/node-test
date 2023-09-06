'use strict';
const functionName = 'set_new_id'
const newColumnName = 'new_id'
const originalColumnName = 'id'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      CREATE FUNCTION ${functionName}() RETURNS TRIGGER AS
      $BODY$
      BEGIN
          NEW.${newColumnName} = NEW.${originalColumnName};
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
