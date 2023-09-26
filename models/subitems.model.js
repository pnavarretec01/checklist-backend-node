const { Model, DataTypes, Sequelize } = require("sequelize");

const ITEM_TABLE = "subitems";

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
      as: "items",
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
    sequenceName: 'sequence_subitems'
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
      model: "items",
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
