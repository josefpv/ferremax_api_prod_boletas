const productosModel = require("./../models/productosModel");

const fetchProductos = async (req, res) => {
  const productosLista = await productosModel.fetchProductos();
  return res.status(200).send(productosLista);
};

const fetchProductosID = async (req, res) => {
  const { id } = req.params;

  if (!id || id === undefined || id === "") {
    return res.status(400).send({ error: `El ID del producto es requerido.` });
  }

  const productoEncontrado = await productosModel.fetchProductosID(id);
  return res.status(200).send(productoEncontrado);
};

const agregaProducto = async (req, res) => {
  const { nombre, descripcion, cantidad, precioUnitario, image } = req.body;
  let { moneda } = req.body;

  if (!Object.keys(req.body).length) {
    return res.status(400).send({ error: `No se recibieron parametros.` });
  }

  if (!nombre) {
    return res.status(400).send({ error: `El parametro nombre es requerido` });
  }

  if (!descripcion) {
    return res
      .status(400)
      .send({ error: `El parametro descripcion es requerido` });
  }

  if (!cantidad) {
    return res
      .status(400)
      .send({ error: `El parametro cantidad es requerido` });
  }

  if (!precioUnitario) {
    return res
      .status(400)
      .send({ error: `El parametro precioUnitario es requerido` });
  }

  const productoAgregadoId = await productosModel.agregaProducto(
    nombre,
    descripcion,
    cantidad,
    precioUnitario,
    image,
    moneda
  );

  return res
    .status(200)
    .send({ msg: `Producto agregado correctamente.`, productoAgregadoId });
};

const actualizaProducto = async (req, res) => {
  const campos = ["nombre", "descripcion", "cantidad", "precioUnitario"];

  const { id } = req.params;
  const { nombre, descripcion, cantidad, precioUnitario } = req.body;

  Object.keys(req.body).forEach((campo) => {
    if (!campos.includes(campo)) {
      return res.status(400).send({ error: `Parametro ${campo} desconocido.` });
    } else {
      if (campo == "") {
        return res
          .status(400)
          .send({ error: `El parametro ${campo} es requerido.` });
      }
    }
  });

  if (!id || id == "" || id <= 0) {
    return res.status(400).send({ error: `El parametro ID es invalido.` });
  }

  const productoActualizado = await productosModel.actualizaProducto(
    id,
    nombre,
    descripcion,
    cantidad,
    precioUnitario
  );

  return res.status(200).send({
    msg: `Producto actualizado.`,
    productoActualizado: {
      id,
      nombre,
      descripcion,
      cantidad,
      precioUnitario,
    },
  });
};

module.exports = {
  fetchProductos,
  fetchProductosID,
  agregaProducto,
  actualizaProducto,
};
