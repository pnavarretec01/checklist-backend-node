const express = require("express");
const router = express.Router();
const formulariosControllers = require("../controllers/formularios.controller");

router
  .get("/", formulariosControllers.get)
  .post("/add-feature", formulariosControllers.addFeature)
  .post("/add-multiple-features", formulariosControllers.addMultipleFeatures);

module.exports = router;
