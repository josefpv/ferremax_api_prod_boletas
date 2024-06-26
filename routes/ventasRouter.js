const express = require("express");
const ventaController = require("./../controllers/ventasController");

const router = express.Router();

router.get("/", ventaController.fetchVentas);
router.get("/:ventaId", ventaController.fetchVentaID);
router.post("/", ventaController.generaVenta);
router.put("/:ventaId", ventaController.actualizaVenta);

module.exports = router;
