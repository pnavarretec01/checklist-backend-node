const { sequelize, models } = require("../libs/sequelize");
const { Op } = require("sequelize");

class SubdivisionsService {
  constructor() {}

  async find() {
    const res = await models.Subdivision.findAll({
      where: {
        eliminado: { [Op.or]: [false, null] },
      },
    });
    return res;
  }

  async findOne(id) {
    const res = await models.Subdivision.findByPk(id);
    return res;
  }

  async create(data) {
    const existingSubdivision = await models.Subdivision.findOne({
      where: {
        nombre: data.nombre,
        [Op.not]: { eliminado: true },
      },
    });

    if (existingSubdivision) {
      throw new Error("Ya existe un registro con estas características");
    }

    const res = await models.Subdivision.create(data);
    return res;
  }

  async update(id, data) {
    const model = await this.findOne(id);

    if (data.nombre !== undefined && data.nombre !== model.nombre) {
      const existingSubdivision = await models.Subdivision.findOne({
        where: {
          nombre: data.nombre,
          [Op.not]: { pk_subdivision_id: id },
          [Op.not]: { eliminado: true },
        },
      });

      if (existingSubdivision) {
        throw new Error("Ya existe una subdivisión con ese nombre");
      }
    }

    const res = await model.update(data);
    return res;
  }

  // async delete(id) {
  //   const model = await this.findOne(id);
  //   if (!model) {
  //     throw new Error("Elemento no encontrado");
  //   }

  //   await model.destroy();
  //   return { deleted: true };
  // }

  async delete(id) {
    const model = await this.findOne(id);
    if (!model) {
      throw new Error("Elemento no encontrado");
    }

    await model.update({ eliminado: true });
    return { deleted: true };
  }
}

module.exports = SubdivisionsService;
