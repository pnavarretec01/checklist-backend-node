const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/items.controller");
const {
  validaciones,
  validarCamposItems,
} = require("../middlewares/validarItems");

router
  .get("/", itemsController.get)
  .get("/:id", itemsController.getById)
  .post("/", validaciones, validarCamposItems, itemsController.create)
  .put("/:id", validaciones, validarCamposItems, itemsController.update)
  .delete("/:id", itemsController._delete);

module.exports = router;
