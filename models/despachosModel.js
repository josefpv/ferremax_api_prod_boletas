const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");

const generateDespachoID = () => {
  return uuidv4();
};

let listaDespachos = [];

const fetchDespachos = () => {
  return listaDespachos;
};

const fetchDespachoId = (id) => {
  return _.filter(listaDespachos, { id });
};

const agregaDespacho = (idVenta) => {
  const idDespacho = generateDespachoID();
  listaDespachos.push({
    id: idDespacho,
    idVenta,
    idDespachador: generateDespachoID(),
    idRuta: generateDespachoID(),
    despachado: false,
  });

  return idDespacho;
};

const actualizaDespacho = (id) => {
  let copiaListaDespacho = [...listaDespachos];
  const despachoEncontrado = _.filter(copiaListaDespacho, { id });

  if (despachoEncontrado.length) {
    const index = _.findIndex(copiaListaDespacho, despachoEncontrado[0]);
    copiaListaDespacho[index].despachado =
      !copiaListaDespacho[index].despachado;
    listaDespachos = copiaListaDespacho;
    return copiaListaDespacho[index];
  }

  return [];
};

module.exports = {
  fetchDespachos,
  fetchDespachoId,
  agregaDespacho,
  actualizaDespacho,
};
