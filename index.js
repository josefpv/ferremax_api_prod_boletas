const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;
//middlewares
app.use(bodyParser.json());
app.use(cors());

const productosRouter = require("./routes/productosRoute");
const ventasRouter = require("./routes/ventasRouter");
const despachosRouter = require("./routes/despachosRoute");

app.use("/api/v1/productos", productosRouter);
app.use("/api/v1/ventas", ventasRouter);
app.use("/api/v1/despachos", despachosRouter);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
