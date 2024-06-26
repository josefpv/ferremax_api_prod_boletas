const express = require("express");
const productosController = require("./../controllers/productosController");

const router = express.Router();

router.get("/", productosController.fetchProductos);
router.get("/:id", productosController.fetchProductosID);
router.post("/", productosController.agregaProducto);
router.put("/:id", productosController.actualizaProducto);

module.exports = router;
