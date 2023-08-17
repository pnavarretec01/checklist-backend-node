const { models } = require('../libs/sequelize');

class SubItemsService { 
  
    constructor() {}

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
        return await models.SubItem.create(data);
    }

    async update(id, data) {
        const model = await this.findOne(id);
        if (!model) {
            throw new Error('SubItem not found');
        }
        return await model.update(data);
    }

    async delete(id) {
        const model = await this.findOne(id);
        if (!model) {
            throw new Error('SubItem not found');
        }
        await model.destroy();
        return { deleted: true };
    }
  
}

module.exports = SubItemsService;
