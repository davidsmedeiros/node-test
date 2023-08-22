module.exports = (sequelize, Sequelize) => {
    const EdgeTable1 = sequelize.define('EdgeTable1', {
        edge_table_1_id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,    
            unique: true,    
        },    
        name: {
            type: Sequelize.STRING(150),
            allowNull: false
        },
        main_table_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }    
    },
    {
        indexes: [
          {
            fields: ['edge_table_1_id'],
          },
          {
            fields: ['main_table_id'],
          },
        ],    
        tableName: 'EdgeTable1',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true,
    }
    );

    EdgeTable1.associate = function(models) {
      EdgeTable1.belongsTo(models.MainTable);
    }
    return EdgeTable1;
  };