const { Model, DataTypes, Sequelize } = require('sequelize');

const ITEM_TABLE = 'subitem';

class SubItem extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: ITEM_TABLE,
            modelName: 'SubItem',
            timestamps: false
        }
    }
} 

const SubItemSchema = {
    pk_subitem_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING,
        field:'nombre'
    },
    orden:{
        allowNull: false,
        type: DataTypes.INTEGER,
        field:'orden'
    },
    fk_item_id: {
        allowNull: false,
        foreignKey: true,
        type: DataTypes.INTEGER,
        field: 'fk_item_id'
    }
}
  
module.exports = { SubItem, SubItemSchema };