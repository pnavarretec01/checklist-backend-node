const { models } = require('../libs/sequelize');

class SubItemsService { 
  
    constructor() {}

    async find() {
      const res = await models.Item.findAll();
      return res;
    }
  
  }
  
  module.exports = SubItemsService;