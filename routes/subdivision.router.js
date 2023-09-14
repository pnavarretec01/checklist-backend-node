const express = require("express");
const router = express.Router();
const subdivisionController = require("../controllers/subdivision.controller");
const {
  validacionesSubdivision,
  validarCamposSubdivision,
} = require("../middlewares/validarSubdivision");

router
  .get("/", subdivisionController.get)
  .get("/:id", subdivisionController.getById)
  .post(
    "/",
    validacionesSubdivision,
    validarCamposSubdivision,
    subdivisionController.create
  )
  .put(
    "/:id",
    validacionesSubdivision,
    validarCamposSubdivision,
    subdivisionController.update
  )
  .delete("/:id", subdivisionController._delete);

module.exports = router;
