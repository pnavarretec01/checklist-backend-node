const sequelize = require("../libs/sequelize");
const { Op } = require("sequelize");
const { models } = sequelize;

class ItemsService {
  constructor() {}

  async find() {
    const res = await models.Item.findAll({
      where: {
        eliminado: { [Op.or]: [false, null] },
      },
      include: [
        {
          model: models.SubItem,
          as: "subitems",
        },
      ],
      order: [
        ["orden", "ASC"],
        ["subitems", "orden", "ASC"],
      ],
    });
    return res;
  }

  async findOne(id) {
    const res = await models.Item.findByPk(id, {
      include: [
        {
          model: models.SubItem,
          as: "subitems",
        },
      ],
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
      // verifica si ya existe un item con el mismo orden
      const existingItem = await models.Item.findOne({
        where: {
          orden: data.orden,
        },
        transaction,
      });

      // si existe, actualiza el orden de todos los items afectados
      if (existingItem) {
        await models.Item.update(
          { orden: sequelize.literal("orden + 1") },
          {
            where: {
              orden: { [Op.gte]: data.orden },
            },
            transaction,
          }
        );
      }

      // crea el nuevo ítem
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
      const model = await this.findOneItem(id);

      if (data.nombre && data.nombre !== model.nombre) {
        const existingItemWithName = await models.Item.findOne({
          where: {
            nombre: data.nombre,
            [Op.not]: { pk_item_id: id },
          },
          transaction,
        });

        if (existingItemWithName) {
          throw new Error("Ya existe un ítem con el mismo nombre.");
        }
      }

      if (data.orden !== undefined && data.orden !== model.orden) {
        const existingItemWithOrder = await models.Item.findOne({
          where: {
            orden: data.orden,
            [Op.not]: { pk_item_id: id },
          },
          transaction,
        });

        if (existingItemWithOrder) {
          await models.Item.update(
            { orden: sequelize.literal("orden + 1") },
            {
              where: {
                orden: { [Op.gte]: data.orden },
                pk_item_id: { [Op.not]: id },
              },
              transaction,
            }
          );
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

  // async delete(id) {
  //   try {
  //     const model = await this.findOne(id);
  //     if (!model) {
  //       throw new Error("Elemento no encontrado");
  //     }

  //     // Eliminar subitems primero
  //     await models.SubItem.destroy({
  //       where: {
  //         fk_item_id: id,
  //       },
  //     });

  //     // Ahora, eliminar el item principal
  //     await model.destroy();
  //     return { deleted: true };
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  async delete(id) {
    try {
      const model = await this.findOneItem(id);
      if (!model) {
        throw new Error("Elemento no encontrado");
      }

      await model.update({ eliminado: true });
      return { deleted: true };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ItemsService;
