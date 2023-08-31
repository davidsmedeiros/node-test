module.exports = (sequelize, Sequelize) => {
    const MainTable = sequelize.define('MainTable', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      }, 
      name: {
          type: Sequelize.STRING,
          allowNull: false
      }  
    },
    {
        indexes: [
          {
            fields: ['id'],
          }
        ],    
        tableName: 'MainTable',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true,
    }     
    );

    MainTable.associate = function(models) {
      MainTable.hasOne(models.EdgeTable1);
      MainTable.hasOne(models.EdgeTable2);
    }

    MainTable.afterCreate(async (record, options) => {
      await sequelize.models.EdgeTable1.create(
      { 
        name: `sample ${record.id}`, 
        main_table_id: record.id
      });  
      await sequelize.models.EdgeTable2.create(
        { 
          name: `sample ${record.id}`, 
          main_table_id: record.id
        });             
    });

    return MainTable;
  };