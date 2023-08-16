const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/items.controller');

router
    .get('/', itemsController.get )

module.exports = router;

