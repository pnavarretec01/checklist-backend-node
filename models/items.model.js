const { Model, DataTypes, Sequelize } = require("sequelize");

const ITEM_TABLE = "item";

class Item extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: ITEM_TABLE,
      modelName: "Item",
      timestamps: true,
    };
  }
  static associate(models) {
    this.hasMany(models.SubItem, {
      foreignKey: "fk_item_id",
      as: "subitems",
      onDelete: "cascade",
      hooks: true,
    });
  }
}

const ItemSchema = {
  pk_item_id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "nombre",
  },
  orden: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    field: "orden",
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  }  
};

module.exports = { Item, ItemSchema };
