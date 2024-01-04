const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const errorHandler = require("./middlewares/errorMiddleware");
const session = require("express-session");
const { keycloak, memoryStore } = require("./config/keycloak-config");

dotenv.config();
const app = express();

const routerApi = require("./routes");

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);
app.use(keycloak.middleware());

routerApi(app);

app.listen(port, () => {
  console.log("Port ==> ", port);
});
