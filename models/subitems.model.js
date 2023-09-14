const { Model, DataTypes, Sequelize } = require("sequelize");

const ITEM_TABLE = "subitem";

class SubItem extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: ITEM_TABLE,
      modelName: "SubItem",
      timestamps: true,
    };
  }
  static associate(models) {
    this.belongsTo(models.Item, {
      foreignKey: "fk_item_id",
      as: "item",
      onDelete: "cascade",
      hooks: true,
    });
  }
}

const SubItemSchema = {
  pk_subitem_id: {
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
  fk_item_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: "item",
      key: "pk_item_id",
    },
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
  },
};

module.exports = { SubItem, SubItemSchema };
