const express = require("express");
const router = express.Router();
const subItemsController = require("../controllers/subitems.controller");
const { validacionesSubItems, validarCamposSubItems } = require("../middlewares/validarSubItems");

router
  .get("/", subItemsController.get)
  .get("/byItem/:id", subItemsController.getByItemItemId)
  .post("/:itemId", validacionesSubItems, validarCamposSubItems, subItemsController.create)
  .get("/:id", subItemsController.getById)
  .put("/:itemId/subitems/:id", validacionesSubItems, validarCamposSubItems, subItemsController.update)
  .delete("/:id", subItemsController._delete);

module.exports = router;
