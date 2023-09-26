// modelos/caracteristicaFormulario.model.js
const { Model, DataTypes } = require("sequelize");

const CARACTERISTICA_FORMULARIO_TABLE = "caracteristicasFormulario";

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
    this.belongsTo(models.Item, { foreignKey: "fk_item_id" });
    this.belongsTo(models.SubItem, { foreignKey: "fk_subitem_id" });
  }
}

const CaracteristicaFormularioSchema = {
  pk_caracteristica_formulario_id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    sequenceName: 'sequence_caracteristicas'
  },
  fk_item_id: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  fk_subitem_id: {
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
  fk_formulario_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "formularios",
      key: "pk_formulario_id",
    },
  },
};

module.exports = { CaracteristicaFormulario, CaracteristicaFormularioSchema };
