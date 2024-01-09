const axios = require("axios");
const { models } = require("../libs/sequelize");
const { sendEmail } = require("./mailer");
const { Op } = require("sequelize");

class FormularioService {
  constructor() {}
  deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  async getAllFormularios(userInfo) {
    const ID_BD_SISTEMA = process.env.ID_BD_SISTEMA;
    const URL_BE_SISTEMA_MENU = process.env.URL_BE_SISTEMA_MENU;

    const resp_tk = await axios.get(`${URL_BE_SISTEMA_MENU}/auth/token`, {
      params: userInfo,
    });

    const resp_users_sis = await axios.get(
      `${URL_BE_SISTEMA_MENU}/admsis/${ID_BD_SISTEMA}/usuarios`,
      {
        headers: { Authorization: "Bearer " + resp_tk.data.access_token },
      }
    );

    // Busca el usuario y sus roles
    const usuarioEncontrado = resp_users_sis.data.find(
      (u) =>
        u.pk_usuario.toUpperCase() === userInfo.usuario.toUpperCase() ||
        (u.alias && u.alias.toUpperCase() === userInfo.usuario.toUpperCase())
    );

    // verifica si el usuario tiene el rol ADMIN_TRAFICO
    const esAdminTrafico = usuarioEncontrado?.roles?.some(
      (rol) => rol.pfk_rol === "ADMIN_TRAFICO"
    );

    let searchCondition;
    if (esAdminTrafico) {
      // el usuario es ADMIN_TRAFICO, obtiene todos los formularios
      searchCondition = {};
    } else {
      // el usuario no es ADMIN_TRAFICO, se asume que es inspector y filtra por su correo
      searchCondition = { email_usuario: userInfo.email };
    }

    const allFormularios = await models.Formulario.findAll({
      where: searchCondition,
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
      order: [["createdAt", "DESC"]],
    });

    const transformedFormularios = allFormularios.map(async (formulario) => {
      const result = await this.getFormularioStructure(formulario);
      return result.data;
    });

    return Promise.all(transformedFormularios);
  }

  // Implementa el método 'find' para aceptar una condición de búsqueda
  async find(searchCondition = {}) {
    return await models.Formulario.findAll({
      where: searchCondition,
      include: [],
      order: [["createdAt", "DESC"]],
    });
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

  async addFormsAndFeatures(data, userInfo) {
    const emailUsuario = userInfo.email;
    const formData = {
      ...data.formulario,
      email_usuario: emailUsuario,
      fk_subdivision_id:
        data.formulario.subdivision ||
        data.formulario.subdivision.fk_subdivision_id,
    };

    const formulario = await this.addForm(formData, data, userInfo);

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
      order: [["createdAt", "DESC"]],
    });
  }

  async addForm(formularioData, dataCompleta, userInfo) {
    try {
      formularioData.email_usuario = userInfo.email;
      const formulario = await models.Formulario.create(formularioData);
      const id = formulario.dataValues.pk_formulario_id;
      if (formularioData.cerrado === 1) {
        const subdivision = await this.findSubdivisionById(
          formularioData.fk_subdivision_id
        );
        sendEmail(
          formularioData,
          subdivision.nombre,
          id,
          dataCompleta,
          userInfo
        );
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
      where: {
        eliminado: { [Op.or]: [false, null] },
      },
      include: [
        {
          model: models.SubItem,
          as: "subitems",
        },
      ],
    });
  }

  //edicion
  async handleEditFormulario(body, userInfo) {
    const { pk_formulario_id, items, ...formData } = body;
    formData.fk_subdivision_id =
      formData.subdivision || formData.subdivision.fk_subdivision_id;

    await this.updateFormulario({
      pk_formulario_id: pk_formulario_id,
      ...formData,
      userInfo,
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

  async updateFormulario(data, dataCompleta, userInfo) {
    try {
      await models.Formulario.update(data, {
        where: { pk_formulario_id: data.pk_formulario_id },
      });

      // Recuperar y devolver el formulario actualizado
      const updatedFormulario = await models.Formulario.findByPk(
        data.pk_formulario_id
      );
      if (data.cerrado === 1 && updatedFormulario) {
        const subdivision = await this.findSubdivisionById(
          data.fk_subdivision_id || data.subdivision.fk_subdivision_id
        );
        sendEmail(
          data,
          subdivision.nombre,
          data.pk_formulario_id,
          dataCompleta,
          userInfo
        );
      }
      return updatedFormulario;
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
  async addOrUpdateForm(data, userInfo) {
    if (
      data.formulario.pk_formulario_id &&
      String(data.formulario.pk_formulario_id).includes("a")
    ) {
      delete data.formulario.pk_formulario_id;
    }

    const formData = {
      ...data.formulario,
      fk_subdivision_id:
        data.formulario.subdivision?.fk_subdivision_id ||
        data.formulario.subdivision,
    };

    let formulario;
    if (data.formulario.pk_formulario_id) {
      formulario = await this.updateFormulario(formData, data, userInfo);
    } else {
      formulario = await this.addForm(formData, data, userInfo);
    }

    const caracteristicasData = data.features.map((caracteristica) => ({
      ...caracteristica,
      formulario_id: formulario.pk_formulario_id,
    }));

    const caracteristicas = await this.agregarOActualizarCaracteristicas(
      caracteristicasData,
      formulario.pk_formulario_id
    );

    return { formulario, caracteristicas };
  }

  async agregarOActualizarCaracteristicas(caracteristicasData, formularioId) {
    // Si se está actualizando, primero elimina las características existentes
    if (formularioId) {
      await models.CaracteristicaFormulario.destroy({
        where: { fk_formulario_id: formularioId },
      });
    }

    // Crear nuevas características
    const newCaracteristicas = caracteristicasData.map((caracteristica) => ({
      ...caracteristica,
      fk_formulario_id: formularioId,
    }));

    return await models.CaracteristicaFormulario.bulkCreate(newCaracteristicas);
  }
}

module.exports = FormularioService;
