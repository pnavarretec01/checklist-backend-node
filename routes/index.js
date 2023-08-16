const express = require('express'); 

const itemsRouter = require('./items.router');
const subitemsRouter = require('./subitems.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router); 
  router.use('/items', itemsRouter);
  router.use('/subitems', subitemsRouter);
}

module.exports = routerApi;
