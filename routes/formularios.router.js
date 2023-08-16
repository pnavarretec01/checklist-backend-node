const express = require('express');
const router = express.Router();
const formulariosControllers = require('../controllers/formularios.controller');

router
    .get('/', formulariosControllers.get )

module.exports = router;

