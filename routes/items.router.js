const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/items.controller");
const { validarCampos } = require("../middlewares/validar-campos");
const { check } = require("express-validator");

const postItemValidators = [
  check("nombre")
    .not()
    .isEmpty()
    .withMessage("El campo nombre es obligatorio."),
  check("orden")
    .not()
    .isEmpty()
    .withMessage("El campo orden es obligatorio.")
    .isInt()
    .withMessage("El campo orden debe ser un número."),
];

router
  .get("/", itemsController.get)
  .get("/:id", itemsController.getById)
  .post("/", postItemValidators, validarCampos, itemsController.create)
  .put("/:id", itemsController.update)
  .delete("/:id", itemsController._delete);

module.exports = router;
