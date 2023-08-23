// modelos/caracteristicaFormulario.model.js
const { Model, DataTypes } = require("sequelize");

const CARACTERISTICA_FORMULARIO_TABLE = "CaracteristicaFormulario";

class CaracteristicaFormulario extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: CARACTERISTICA_FORMULARIO_TABLE,
      modelName: "CaracteristicaFormulario",
      timestamps: false,
    };
  }
  static associate(models) {
    this.belongsTo(models.Item, { foreignKey: "item_id" });
    this.belongsTo(models.SubItem, { foreignKey: "subitem_id" });
  }
}

const CaracteristicaFormularioSchema = {
  caracteristica_formulario_id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  item_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  subitem_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  pk: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  collera: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  observacion: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  formulario_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "formulario",
      key: "pk_formulario_id",
    },
  },
};

module.exports = { CaracteristicaFormulario, CaracteristicaFormularioSchema };
