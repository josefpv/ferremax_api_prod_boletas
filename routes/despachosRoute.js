const express = require("express");
const despachosController = require("./../controllers/despachosController");

const router = express.Router();

router.get("/", despachosController.fetchDespachos);
router.get("/:id", despachosController.fetchDespachoId);
router.post("/", despachosController.agregaDespacho);
router.put("/:id", despachosController.actualizaDespacho);

module.exports = router;
