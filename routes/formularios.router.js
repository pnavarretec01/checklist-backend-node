const express = require("express");
const router = express.Router();
const formulariosControllers = require("../controllers/formularios.controller");

router
  .get("/", formulariosControllers.get)
  .get("/:id", formulariosControllers.getById)
  .post("/add-feature", formulariosControllers.addFeature)
  .post("/addForm", formulariosControllers.addForms)
  .put("/:id", formulariosControllers.editFormulario)
  .delete("/:id", formulariosControllers.deleteFormulario);

module.exports = router;
