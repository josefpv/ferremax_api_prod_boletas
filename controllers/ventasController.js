const ventasModel = require("./../models/ventasModel");
const productosModel = require("./../models/productosModel");

const fetchVentas = async (req, res) => {
  const ventasLista = await ventasModel.fetchVentas();
  return res.status(200).send(ventasLista);
};

const fetchVentaID = async (req, res) => {
  const { ventaId } = req.params;

  if (!Boolean(ventaId)) {
    return res
      .status(400)
      .send({ error: `El parametro ventaID es requerido.` });
  }

  const ventaEncontrada = await ventasModel.fetchVentasId(ventaId);
  return res.status(200).send(ventaEncontrada);
};

const fetchProductosVenta = async (req, res) => {
  const { ventaId } = req.params;

  if (!ventaId || ventaId === "") {
    return res
      .status(400)
      .send({ error: `El parametro ventaId es requerido.` });
  }

  const productosVenta = await ventasModel.fetchProductosVenta(ventaId);
  return res.status(200).send(productosVenta);
};

const actualizaVenta = async (req, res) => {
  const { ventaId } = req.params;
  const { despachado } = req.body;

  if (!Boolean(ventaId)) {
    return res
      .status(400)
      .send({ error: `El parametro ventaID es requerido.` });
  }

  const ventaModificada = await ventasModel.actualizaVenta(ventaId, despachado);
  return res.status(200).send({ msg: `Venta actualizada`, ventaId });
};

const generaVenta = async (req, res) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).send({ error: `No se recibieron parametros.` });
  }

  const { productos, clienteId } = req.body;

  let montoTotal = 0;

  const listaProductos = await Promise.all(
    productos.map(async (item) => {
      const productoInfo = await productosModel.fetchProductosID(item.id);
      //console.log(productoInfo);
      montoTotal += productoInfo[0].precio_unitario * item.cantidad;
      //const insertaProductoVenta = await ventasModel.registraVentaProducto()
      return {
        id: productoInfo[0].id,
        precio: productoInfo[0].precio_unitario,
        cantidad: item.cantidad,
        monto: productoInfo[0].precio_unitario * item.cantidad,
      };
    })
  );

  //registra venta
  const ventaId = await ventasModel.registraVenta(
    montoTotal,
    clienteId,
    0,
    new Date()
  );

  listaProductos.forEach(async (p) => {
    await ventasModel.registraVentaProducto(ventaId, p.id, p.cantidad, p.monto);
  });

  return res.status(200).send({ msg: `Venta registrada`, ventaId });
};

module.exports = {
  fetchVentas,
  fetchVentaID,
  actualizaVenta,
  generaVenta,
  fetchProductosVenta,
};
