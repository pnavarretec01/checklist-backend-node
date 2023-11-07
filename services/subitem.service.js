const sequelize = require("../libs/sequelize");
const { Op } = require("sequelize");
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
    const transaction = await sequelize.transaction();
    try {
      const existingSubItem = await models.SubItem.findOne({
        where: {
          orden: data.orden,
          fk_item_id: data.fk_item_id,
        },
        transaction,
      });

      if (existingSubItem) {
        await models.SubItem.update(
          { orden: sequelize.literal("orden + 1") },
          {
            where: {
              orden: { [Op.gte]: data.orden },
              fk_item_id: data.fk_item_id,
            },
            transaction,
          }
        );
      }

      // Crea el nuevo subitem
      const res = await models.SubItem.create(data, { transaction });
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

      if (data.orden !== undefined && data.orden !== model.orden) {
        const existingSubItem = await models.SubItem.findOne({
          where: {
            orden: data.orden,
            fk_item_id: model.fk_item_id,
            [Op.not]: { pk_subitem_id: id },
          },
          transaction,
        });

        if (existingSubItem) {
          await models.SubItem.update(
            { orden: sequelize.literal("orden + 1") },
            {
              where: {
                orden: { [Op.gte]: data.orden },
                fk_item_id: model.fk_item_id,
                pk_subitem_id: { [Op.not]: id },
              },
              transaction,
            }
          );
        }
      }

      // Actualiza el subitem
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
      await models.SubItem.destroy({
        where: {
          pk_subitem_id: id,
        },
      });
      return { deleted: true };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SubItemsService;
