const express = require("express");
const verifyTokenMiddleware = require("../middlewares/verifyToken");

const itemsRouter = require("./items.router");
const subitemsRouter = require("./subitems.router");
const formulariosRouter = require("./formularios.router");
const subdivisionRouter = require("./subdivision.router");
const menuRouter = require("./menu.router");

function routerApi(app) {
  const router = express.Router();

  router
  .use("/items", verifyTokenMiddleware, itemsRouter)
  .use("/subitems", verifyTokenMiddleware, subitemsRouter)
  .use("/formularios", verifyTokenMiddleware, formulariosRouter)
  .use("/subdivision", verifyTokenMiddleware, subdivisionRouter)
  .use("/menu", verifyTokenMiddleware, menuRouter)

  app.use("/api/v1", router);
}

module.exports = routerApi;
