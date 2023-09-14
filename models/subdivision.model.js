const { Model, DataTypes, Sequelize } = require("sequelize");

const SUBDIVISION_TABLE = "subdivision";

class Subdivision extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: SUBDIVISION_TABLE,
      modelName: "Subdivision",
      timestamps: true,
    };
  }
}

const SubdivisionSchema = {
  pk_subdivision_id: {
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

module.exports = { Subdivision, SubdivisionSchema };
