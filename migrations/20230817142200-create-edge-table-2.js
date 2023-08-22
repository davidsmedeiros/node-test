'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('EdgeTable2', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },      
      main_table_id: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }).then(() => queryInterface.addIndex(
      'EdgeTable2',
      ['id'],
      { fields: ['id'] }         
    )).then(() => queryInterface.addIndex(
      'EdgeTable2',
      ['main_table_id'],
      { fields: ['main_table_id'] }         
    ))
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('edgeTable2')
  }
};
