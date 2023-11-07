const express = require("express");
const router = express.Router();
const formulariosControllers = require("../controllers/formularios.controller");
const {
  validaciones,
  validarCamposItems,
  validacionesPut,
} = require("../middlewares/validarChecklist");

router
  .get("/", formulariosControllers.get)
  .get("/:id", formulariosControllers.getById)
  .post("/add-feature", formulariosControllers.addFeature)
  .post("/", validaciones, validarCamposItems, formulariosControllers.addForms)
  .put(
    "/:id",
    validacionesPut,
    validarCamposItems,
    formulariosControllers.editFormulario
  )
  .delete("/:id", formulariosControllers.deleteFormulario);

module.exports = router;
