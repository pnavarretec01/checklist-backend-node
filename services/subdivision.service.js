const sequelize = require("../libs/sequelize");
const { Op } = require("sequelize");
const { models } = sequelize;

class SubdivisionsService {
  constructor() {}

  async find() {
    const res = await models.Subdivision.findAll();
    return res;
  }

  async findOne(id) {
    const res = await models.Subdivision.findByPk(id);
    return res;
  }

  async create(data) {
    const transaction = await sequelize.transaction();
    try {
      const existingSubdivision = await models.Subdivision.findOne({
        where: {
          [Op.or]: [{ nombre: data.nombre }],
        },
        transaction,
      });

      if (existingSubdivision) {
        throw new Error("Ya existe un registro con estas características");
      }

      const res = await models.Subdivision.create(data, { transaction });
      await transaction.commit();
      return res;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async update(id, data) {
    const transaction = await sequelize.transaction();
    try {
      const model = await this.findOne(id);

      if (data.nombre !== undefined && data.nombre !== model.nombre) {
        const existingSubdivision = await models.Subdivision.findOne({
          where: {
            nombre: data.nombre,
            [Op.not]: { pk_subdivision_id: id },
          },
          transaction,
        });

        if (existingSubdivision) {
          throw new Error("Ya existe una subdivisión con ese nombre");
        }
      }

      const res = await model.update(data, { transaction });
      await transaction.commit();
      return res;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async delete(id) {
    try {
      const model = await this.findOne(id);
      if (!model) {
        throw new Error("Elemento no encontrado");
      }

      await model.destroy();
      return { deleted: true };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SubdivisionsService;
