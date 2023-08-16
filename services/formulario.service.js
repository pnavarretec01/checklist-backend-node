const { models } = require('../libs/sequelize');

class FormularioService { 
  
    constructor() {}

    async find() {
      const res = await models.Formulario.findAll();
      return res;
    }
  
  }
  
  module.exports = FormularioService;