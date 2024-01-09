const { sequelize, models } = require("../libs/sequelize");
const { Op } = require("sequelize");
const axios = require("axios");

class MenuService {
  constructor() {}

  async getMenu(userInfo) {
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
    const tengo_roles = resp_users_sis.data.find(
      (u) =>
        u.pk_usuario.toUpperCase() == userInfo.usuario.toUpperCase() ||
        u.alias?.toUpperCase() == userInfo.usuario.toUpperCase()
    )?.roles?.length;

    if (!tengo_roles || tengo_roles == 0) {
      p_params.usuario = "Inspector";
    }

    const params = { usuario: userInfo.short_email, sistema: ID_BD_SISTEMA };

    const response = await axios.get(
      `${URL_BE_SISTEMA_MENU}/admsis/${ID_BD_SISTEMA}/menu`,
      {
        headers: { Authorization: "Bearer " + resp_tk.data.access_token },
        params: params,
      }
    );

    return response.data;
  }
}

module.exports = MenuService;
