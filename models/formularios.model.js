const { Model, DataTypes, Sequelize } = require("sequelize");

const FORMULARIO_TABLE = "formularios";

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
      foreignKey: "fk_formulario_id",
    });
    this.belongsTo(models.Subdivision, {
      foreignKey: "fk_subdivision_id",
      as: "Subdivision",
    });
  }
}

const FormularioSchema = {
  pk_formulario_id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    sequenceName: 'sequence_formularios'
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
  fk_subdivision_id: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: "fk_subdivision_id",
  },
  observacion_general: {
    allowNull: true,
    type: DataTypes.STRING,
    field: "observacion_general",
  },
  pk_inicio: {
    allowNull: true,
    type: DataTypes.INTEGER,
    field: "pk_inicio",
  },
  pk_termino: {
    allowNull: true,
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
