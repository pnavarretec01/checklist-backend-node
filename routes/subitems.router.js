const express = require('express');
const router = express.Router();
const subItemsController = require('../controllers/subitems.controller');

router
    .get('/', subItemsController.get )
    .get('/:id', subItemsController.getByItemItemId )

module.exports = router;

