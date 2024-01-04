const express = require('express'); 
const { keycloak } = require('../config/keycloak-config')

const itemsRouter = require('./items.router');
const subitemsRouter = require('./subitems.router');
const formulariosRouter = require('./formularios.router');
const subdivisionRouter = require('./subdivision.router');

function routerApi(app) {
  const router = express.Router();
  router.use(keycloak.protect(), (req, res, next) => {
    console.log(req.kauth.grant.access_token.content);
    next();
  });
  app.use('/api/v1', router); 
  router.use('/items', itemsRouter);
  router.use('/subitems', subitemsRouter);
  router.use('/formularios', formulariosRouter);
  router.use('/subdivision', subdivisionRouter);
}

module.exports = routerApi;
