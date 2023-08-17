const express = require('express');
const router = express.Router();
const subItemsController = require('../controllers/subitems.controller');
const { validarCampos } = require("../middlewares/validar-campos");
const { check } = require("express-validator");

const postSubItemValidators = [
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
  check("fk_item_id")
    .not()
    .isEmpty()
    .withMessage("El campo fk_item_id es obligatorio.")
    .isInt()
    .withMessage("El campo fk_item_id debe ser un número."),
];

router
    .get('/', subItemsController.get)
    .get('/byItem/:id', subItemsController.getByItemItemId) // Recupera por fk_item_id
    .post('/', postSubItemValidators, validarCampos, subItemsController.create)
    .get('/:id', subItemsController.getById) // Recupera por pk_subitem_id
    .put('/:id', subItemsController.update) // Actualiza por pk_subitem_id
    .delete('/:id', subItemsController._delete); // Borra por pk_subitem_id

module.exports = router;
