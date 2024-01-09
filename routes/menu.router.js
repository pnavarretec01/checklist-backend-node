const express = require("express");
const router = express.Router();
const menuFrontController = require("../controllers/menuFront.controller");

router.get("/", menuFrontController.get);

module.exports = router;
