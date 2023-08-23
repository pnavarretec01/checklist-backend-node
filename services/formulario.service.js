const { models } = require("../libs/sequelize");

class FormularioService {
  constructor() {}

  async find() {
    const res = await models.Formulario.findAll({
      include: [
        {
          model: models.CaracteristicaFormulario,
          include: [
            {
              model: models.Item,
            },
            {
              model: models.SubItem,
            },
          ],
        },
      ],
    });
    return res;
  }
}

module.exports = FormularioService;
