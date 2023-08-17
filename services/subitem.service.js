const sequelize = require('../libs/sequelize');
const { Op } = require('sequelize');
const { models } = sequelize;

class SubItemsService {
  async find() {
    return await models.SubItem.findAll();
  }

  async findOne(id) {
    return await models.SubItem.findByPk(id);
  }

  async findOneByFk(id) {
    return await models.SubItem.findOne({ where: { fk_item_id: id } });
  }

  async create(data) {
    const existeSubItem = await models.SubItem.findOne({
      where: {
        [Op.or]: [
          { orden: data.orden },
          { nombre: data.nombre }
        ]
      }
    });

    if (existeSubItem) {
      throw new Error("Ya existe un registro con estas características");
    }

    const res = await models.SubItem.create(data);
    return res;
  }

  async update(id, data) {
    const model = await this.findOne(id);

    if (
      (data.orden !== undefined && data.orden !== model.orden) ||
      (data.nombre !== undefined && data.nombre !== model.nombre)
    ) {
      const existingItem = await models.SubItem.findOne({
        where: {
          [Op.or]: [{ orden: data.orden }, { nombre: data.nombre }],
          [Op.not]: { pk_subitem_id: id },
        },
      });

      if (existingItem) {
        throw new Error("Ya existe un Subitem con el mismo orden o nombre");
      }
    }

    const res = await model.update(data);
    return res;
  }

  async delete(id) {
    const model = await this.findOne(id);
    if (!model) {
      throw new Error('SubItem no encontrado');
    }
    await model.destroy();
    return { deleted: true };
  }
}

module.exports = SubItemsService;
