const { Model, DataTypes, Sequelize } = require('sequelize');

const ITEM_TABLE = 'formulario';

class Formulario extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: ITEM_TABLE,
            modelName: 'Formulario',
            timestamps: false
        }
    }
} 

const FormularioSchema = {
    pk_formulario_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombre_supervisor: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'nombre_supervisor'
    },
    fecha: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'fecha'
    },
    subdivisions: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'subdivision'
    },
    observacion_general: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'observacion_general'
    },
    pk_inicio: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'pk_inicio'
    },
    pk_termino: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'pk_termino'
    },
}
  
module.exports = { Formulario, FormularioSchema };