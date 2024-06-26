const ventasModel = require("./../models/ventasModel");
const productosModel = require("./../models/productosModel");

const fetchVentas = async (req, res) => {
  const ventasLista = ventasModel.fetchVentas();
  return res.status(200).send(ventasLista);
};

const fetchVentaID = async (req, res) => {
  const { ventaId } = req.params;

  if (!Boolean(ventaId)) {
    return res
      .status(400)
      .send({ error: `El parametro ventaID es requerido.` });
  }

  const ventaEncontrada = ventasModel.fetchVentasId(ventaId);
  return res.status(200).send(ventaEncontrada);
};

const actualizaVenta = async (req, res) => {
  const { ventaId } = req.params;

  if (!Boolean(ventaId)) {
    return res
      .status(400)
      .send({ error: `El parametro ventaID es requerido.` });
  }

  const ventaModificada = ventasModel.actualizaVenta(ventaId);
  return res.status(200).send(ventaModificada);
};

const generaVenta = async (req, res) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).send({ error: `No se recibieron parametros.` });
  }

  const { productos, clienteId } = req.body;

  let montoTotal = 0;

  const productosLista = productos.map((item) => {
    const productoInfo = productosModel.fetchProductosID(item.id);
    console.log(productoInfo);
    montoTotal += productoInfo[0].precioUnitario * item.cantidad;
    return {
      id: productoInfo[0].id,
      precio: productoInfo[0].precioUnitario,
      cantidad: item.cantidad,
      monto: productoInfo[0].precioUnitario * item.cantidad,
    };
  });

  const idVenta = ventasModel.registraVenta(
    productosLista,
    montoTotal,
    clienteId
  );
  return res.status(200).send({ idVenta });
};

module.exports = {
  fetchVentas,
  fetchVentaID,
  actualizaVenta,
  generaVenta,
};
