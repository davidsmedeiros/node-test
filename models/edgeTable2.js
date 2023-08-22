module.exports = (sequelize, Sequelize) => {
    const EdgeTable2 = sequelize.define('EdgeTable2', {
        edge_table_2_id: {
            type: Sequelize.BIGINT,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,    
            unique: true,    
        },
        name: {
            type: Sequelize.STRING,
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
            fields: ['edge_table_2_id'],
          },
          {
            fields: ['main_table_id'],
          },
        ],    
        tableName: 'EdgeTable2',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true,
    }
    );

    EdgeTable2.associate = function(models) {
      EdgeTable2.belongsTo(models.MainTable);
    }

    return EdgeTable2;
  };