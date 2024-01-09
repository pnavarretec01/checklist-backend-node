const MenuService = require("../services/menu.service");
const service = new MenuService();

const get = async (req, res, next) => {
  try {
    const userInfo = {
      short_email: req.user.preferred_username,
      usuario: req.user.email,
      email: req.user.email,
      name: req.user.name,
    };
    const response = await service.getMenu(userInfo);

    res
      .status(200)
      .json({ success: true, code: 200, data: response, status: "success" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get,
};
