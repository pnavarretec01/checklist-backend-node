const { models } = require("../libs/sequelize");
const { sendEmail } = require("./mailer");

class FormularioService {
  constructor() {}

  deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  async getAllFormularios() {
    const allFormularios = await this.find();

    const transformedFormularios = await Promise.all(
      allFormularios.map(async (formulario) => {
        const result = await this.getFormularioStructure(formulario);
        return result.data;
      })
    );

    return transformedFormularios;
  }

  async getFormularioStructure(formulario) {
    let subItemMap = {};
    const itemsStructureOriginal = await this.findAllItemsWithSubItems();
    const itemsStructure = this.deepCopy(itemsStructureOriginal);

    if (itemsStructure) {
      itemsStructure.forEach((item) => {
        item.subitems.forEach((subitem) => {
          subItemMap[subitem.pk_subitem_id] = { ...subitem, data: [] };
        });
      });
    }

    formulario.CaracteristicaFormularios.forEach((caracteristica) => {
      let targetSubItem = subItemMap[caracteristica.fk_subitem_id];
      if (targetSubItem) {
        targetSubItem.data.push({
          pk_caracteristica_formulario_id:
            caracteristica.pk_caracteristica_formulario_id,
          item_id: caracteristica.fk_item_id,
          subitem_id: caracteristica.fk_subitem_id,
          pk: caracteristica.pk,
          collera: caracteristica.collera,
          observacion: caracteristica.observacion,
          formulario_id: caracteristica.fk_formulario_id,
        });
      }
    });

    let response = {
      pk_formulario_id: formulario.pk_formulario_id,
      nombre_supervisor: formulario.nombre_supervisor,
      fecha: formulario.fecha,
      subdivision: formulario.Subdivision,
      observacion_general: formulario.observacion_general,
      pk_inicio: formulario.pk_inicio,
      pk_termino: formulario.pk_termino,
      cerrado: formulario.cerrado,
      items: [],
    };

    itemsStructure.forEach((item) => {
      let newItem = this.deepCopy(item);
      newItem.subitems = item.subitems
        .map((subitem) => {
          return {
            ...subitem,
            data: subItemMap[subitem.pk_subitem_id].data,
          };
        })
        .filter((subitem) => {
          if (formulario.cerrado === true || formulario.cerrado === 1) {
            return subitem.data.length > 0;
          }
          return true;
        });

      if (formulario.cerrado === true || formulario.cerrado === 1) {
        if (newItem.subitems.length > 0) {
          response.items.push(newItem);
        }
      } else {
        response.items.push(newItem);
      }
    });

    return {
      success: true,
      code: 200,
      data: response,
    };
  }

  transformFormulario(formulario) {
    return {
      pk_formulario_id: formulario.pk_formulario_id,
      nombre_supervisor: formulario.nombre_supervisor,
      fecha: formulario.fecha,
      subdivision: formulario.subdivision,
      observacion_general: formulario.observacion_general,
      pk_inicio: formulario.pk_inicio,
      pk_termino: formulario.pk_termino,
      cerrado: formulario.cerrado,
      items: formulario.CaracteristicaFormularios.map((caracteristica) => ({
        id: caracteristica.fk_item_id,
        title: caracteristica.Item.title,
        items: [
          {
            id: caracteristica.fk_subitem_id,
            title: caracteristica.SubItem.title,
            data: [
              {
                pk_caracteristica_formulario_id:
                  caracteristica.pk__caracteristica_formulario_id,
                item_id: caracteristica.fk_item_id,
                subitem_id: caracteristica.fk_subitem_id,
                pk: caracteristica.pk,
                collera: caracteristica.collera,
                observacion: caracteristica.observacion,
                formulario_id: caracteristica.fk_formulario_id,
              },
            ],
          },
        ],
      })),
    };
  }

  async addFormsAndFeatures(data) {
    const formData = {
      ...data.formulario,
      fk_subdivision_id: data.formulario.subdivision || data.formulario.subdivision.fk_subdivision_id,
    };

    const formulario = await this.addForm(formData);

    const caracteristicasData = data.features.map((caracteristica) => ({
      ...caracteristica,
      formulario_id: formulario.pk_formulario_id,
    }));

    const caracteristicas = await this.agregarMultiplesCaracteristicas(
      caracteristicasData
    );
    return { formulario, caracteristicas };
  }

  async getFormularioById(id) {
    const formulario = await this.findById(id);
    return this.getFormularioStructure(formulario);
  }

  async find() {
    return await models.Formulario.findAll({
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
        {
          model: models.Subdivision,
          as: "Subdivision",
        },
      ],
    });
  }

  async addForm(formularioData) {
    try {
      const formulario = await models.Formulario.create(formularioData);
      const id = formulario.dataValues.pk_formulario_id;
      if (formularioData.cerrado === 1) {
        
        const subdivision = await this.findSubdivisionById(
          formularioData.fk_subdivision_id
        );
        console.log(subdivision);
        await sendEmail(formularioData, subdivision.nombre, id);
      }

      return formulario;
    } catch (error) {
      throw error;
    }
  }

  async agregarMultiplesCaracteristicas(caracteristicasData) {
    const transformedData = caracteristicasData.map((caracteristica) => ({
      ...caracteristica,
      fk_item_id: caracteristica.item_id,
      fk_formulario_id: caracteristica.formulario_id,
      fk_subitem_id: caracteristica.subitem_id,
    }));

    return await models.CaracteristicaFormulario.bulkCreate(transformedData);
  }

  async findById(id) {
    const formulario = await models.Formulario.findByPk(id, {
      include: [
        {
          model: models.CaracteristicaFormulario,
          as: "CaracteristicaFormularios",
          include: [
            {
              model: models.Item,
              as: "Item",
            },
            {
              model: models.SubItem,
              as: "SubItem",
            },
          ],
        },
        {
          model: models.Subdivision,
          as: "Subdivision",
        },
      ],
    });

    if (!formulario) {
      throw new Error("Formulario no encontrado");
    }

    return formulario;
  }

  async findAllItemsWithSubItems() {
    return await models.Item.findAll({
      include: [
        {
          model: models.SubItem,
          as: "subitems",
        },
      ],
    });
  }

  //edicion
  async handleEditFormulario(body) {
    const { pk_formulario_id, items, ...formData } = body;
    formData.fk_subdivision_id = formData.subdivision || formData.subdivision.fk_subdivision_id;

    await this.updateFormulario({
      pk_formulario_id: pk_formulario_id,
      ...formData,
    });

    let caracteristicas = [];
    if (items) {
      items.forEach((item) => {
        if (item.subitems) {
          item.subitems.forEach((subitem) => {
            if (subitem.data && subitem.data.length > 0) {
              subitem.data.forEach((data) => {
                caracteristicas.push({
                  ...data,
                  fk_item_id: item.pk_item_id,
                  fk_subitem_id: subitem.pk_subitem_id,
                });
              });
            }
          });
        }
      });
    }

    await this.updateCaracteristicaFormularios(
      pk_formulario_id,
      caracteristicas
    );
  }

  async updateFormulario(data) {
    try {
      const { pk_formulario_id, ...formData } = data;
      await models.Formulario.update(formData, {
        where: { pk_formulario_id: pk_formulario_id },
      });
      if (data.cerrado === 1) {
        const subdivision = await this.findSubdivisionById(
          data.fk_subdivision_id || data.subdivision.fk_subdivision_id 
        );
        await sendEmail(data, subdivision.nombre, pk_formulario_id);
      }
    } catch (error) {
      throw error;
    }
  }

  async updateCaracteristicaFormularios(formulario_id, caracteristicas) {
    try {
      await models.CaracteristicaFormulario.destroy({
        where: { fk_formulario_id: formulario_id },
      });

      const newCaracteristicas = caracteristicas.map((caracteristica) => ({
        ...caracteristica,
        fk_formulario_id: formulario_id,
      }));

      await models.CaracteristicaFormulario.bulkCreate(newCaracteristicas);
    } catch (error) {
      throw error;
    }
  }

  async deleteFormularioById(id) {
    try {
      // elimina todas las CaracteristicaFormulario asociadas a ese formulario
      await models.CaracteristicaFormulario.destroy({
        where: { fk_formulario_id: id },
      });

      // elimina el formulario
      await models.Formulario.destroy({
        where: { pk_formulario_id: id },
      });
    } catch (error) {
      throw new Error("Error al eliminar el Formulario y sus Características");
    }
  }

  async findSubdivisionById(id) {
    const subdivision = await models.Subdivision.findByPk(id);
    if (!subdivision) {
      throw new Error("Subdivisión no encontrada");
    }
    return subdivision;
  }
}

module.exports = FormularioService;
