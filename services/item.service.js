const sequelize = require('../libs/sequelize');
const { Op } = require('sequelize');
const { models } = sequelize;

class ItemsService {
  constructor() {}

  async find() {
    const res = await models.Item.findAll({
      include: [
        {
          model: models.SubItem,
          as: "subitems",
        },
      ],
    });
    return res;
  }

  async findOne(id) {
    const res = await models.Item.findByPk(id, {
        include: [{
            model: models.SubItem,
            as: 'subitems'
        }]
    });
    return res;
}

  async findItems() {
    const res = await models.Item.findAll();
    return res;
  }

  async findOneItem(id) {
    const res = await models.Item.findByPk(id);
    return res;
  }

  async create(data) {
    const transaction = await sequelize.transaction();
    try {
      const existeItem = await models.Item.findOne({
        where: {
          [Op.or]: [
            { orden: data.orden },
            { nombre: data.nombre }
          ]
        },
        transaction
      });

      if (existeItem) {
        throw new Error("Ya existe un registro con estas características");
      }

      const res = await models.Item.create(data, { transaction });
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

      if (
        (data.orden !== undefined && data.orden !== model.orden) ||
        (data.nombre !== undefined && data.nombre !== model.nombre)
      ) {
        const existingItem = await models.Item.findOne({
          where: {
            [Op.or]: [{ orden: data.orden }, { nombre: data.nombre }],
            [Op.not]: { pk_item_id: id },
          },
          transaction
        });

        if (existingItem) {
          throw new Error("Ya existe un item con el mismo orden o nombre");
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
    const transaction = await sequelize.transaction();
    try {
      const model = await this.findOne(id);
      await model.destroy({ transaction });
      await transaction.commit();
      return { deleted: true };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = ItemsService;
