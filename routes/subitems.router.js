const express = require('express');
const router = express.Router();
const subItemsController = require('../controllers/subitems.controller');

router
    .get('/', subItemsController.get )

module.exports = router;

