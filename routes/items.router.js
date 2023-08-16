const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/items.controller');

router
    .get('/', itemsController.get )
    .get('/:id', itemsController.getById )
    .post('/', itemsController.create )
    .put('/:id', itemsController.update )
    .delete('/:id', itemsController._delete );

module.exports = router;

