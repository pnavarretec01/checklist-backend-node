const { models } = require('../libs/sequelize');

class SubItemsService { 
  
    constructor() {}

    async find() {
      const res = await models.SubItem.findAll();
      return res;
    }
  
  }
  
  module.exports = SubItemsService;