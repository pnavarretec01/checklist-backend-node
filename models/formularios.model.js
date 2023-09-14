const { Model, DataTypes, Sequelize } = require("sequelize");

const FORMULARIO_TABLE = "formulario";

class Formulario extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: FORMULARIO_TABLE,
      modelName: "Formulario",
      timestamps: true,
    };
  }
  static associate(models) {
    this.hasMany(models.CaracteristicaFormulario, {
      foreignKey: "formulario_id",
    });
  }
}

const FormularioSchema = {
  pk_formulario_id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre_supervisor: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "nombre_supervisor",
  },
  fecha: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "fecha",
  },
  subdivision: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "subdivision",
  },
  observacion_general: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "observacion_general",
  },
  pk_inicio: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: "pk_inicio",
  },
  pk_termino: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: "pk_termino",
  },
  cerrado: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: "cerrado",
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

module.exports = { Formulario, FormularioSchema };
