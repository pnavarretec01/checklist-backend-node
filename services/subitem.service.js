const { models } = require('../libs/sequelize');

class SubItemsService { 
  
    constructor() {}

    async find() {
      const res = await models.SubItem.findAll();
      return res;
    }

    async findOneByFk(id) {
      const res = await models.SubItem.findOneByFk(id);
      return res;
    }
  
  }
  
  module.exports = SubItemsService;