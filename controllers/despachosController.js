const despachosModel = require("./../models/despachosModel");

const fetchDespachos = async (req, res) => {
  const despachos = await despachosModel.fetchDespachos();
  return res.status(200).send(despachos);
};

const fetchDespachoId = async (req, res) => {
  const { id } = req.params;

  if (!id || id === "") {
    return res.status(400).send({ error: `El parametro id es requerido.` });
  }

  const despacho = await despachosModel.fetchDespachoId(id);
  return res.status(200).send(despacho);
};

const agregaDespacho = async (req, res) => {
  const { idVenta } = req.body;

  if (!idVenta || idVenta === "") {
    return res
      .status(400)
      .send({ error: `El parametro idVenta es requerido.` });
  }

  const id = await despachosModel.agregaDespacho(idVenta);
  return res.status(200).send({ id });
};

const actualizaDespacho = async (req, res) => {
  const { id } = req.params;

  if (!id || id === "") {
    return res.status(400).send({ error: `El parametro id es requerido.` });
  }

  const despacho = await despachosModel.actualizaDespacho(id);
  return res.status(200).send({ msg: `Se ha actualizado el despacho.` });
};

module.exports = {
  fetchDespachos,
  fetchDespachoId,
  agregaDespacho,
  actualizaDespacho,
};
