const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const errorHandler = require("./middlewares/errorMiddleware");
const verifyTokenMiddleware = require("./middlewares/verifyToken");

dotenv.config();
const app = express();

const routerApi = require("./routes");

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use(verifyTokenMiddleware);

routerApi(app);

app.listen(port, () => {
  console.log("Port ==> ", port);
});
