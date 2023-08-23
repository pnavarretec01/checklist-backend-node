// services/caracteristicaFormulario.service.js
const { models } = require("../libs/sequelize");

class CaracteristicaFormularioService {
  constructor() {}

  async findAll() {
    return await models.CaracteristicaFormulario.findAll();
  }

  async findOne(id) {
    return await models.CaracteristicaFormulario.findByPk(id);
  }

  async create(data) {
    return await models.CaracteristicaFormulario.create(data);
  }

  async update(id, data) {
    const exist = await this.findOne(id);
    if (!exist) throw new Error("CaracteristicaFormulario no encontrado");
    return await exist.update(data);
  }

  async delete(id) {
    const exist = await this.findOne(id);
    if (!exist) throw new Error("CaracteristicaFormulario no encontrado");
    return await exist.destroy();
  }

  async addMultipleFeatures(data) {
    try {
      return await models.CaracteristicaFormulario.bulkCreate(data);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CaracteristicaFormularioService;
