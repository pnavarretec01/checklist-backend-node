const { models } = require('../libs/sequelize');

class ItemsService { 
  
    constructor() {}

    async find() {
      const res = await models.Item.findAll();
      return res;
    }

    async findOne(id) {
      const res = await models.Item.findByPk(id);
      return res;
    }

    async create(data) {
      const existeOrden = await models.Item.findOne({ orden: data.orden })
      if (existeOrden) {
        const res = await models.Item.create(data);
      }else{
        throw new Error('Ya existe un orden')
      }
      return res;
    }

    async update(id, data) {
      const model = await this.findOne(id);
      const res = await model.update(data);
      return res;
    }

    async delete(id) {
      const model = await this.findOne(id);
      await model.destroy();
      return { deleted: true };
    }
  
  }
  
  module.exports = ItemsService;