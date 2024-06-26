const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");

const generateProductID = () => {
  return uuidv4();
};

let productosLista = [
  {
    id: generateProductID(),
    nombre: "Lana de vidrio R122 libre 50mm 0,6x10m 1 rollo",
    descripcion: "Lana de vidrio R122 libre 50mm 0,6x10m 1 rollo",
    cantidad: 300,
    precioUnitario: 18290,
    moneda: "CLP",
    image: "lana-vidrio",
  },
  {
    id: generateProductID(),
    nombre: "Set 24 Fresas 1/4' ubermann",
    descripcion: "Set 24 Fresas 1/4' ubermann",
    cantidad: 44,
    precioUnitario: 34990,
    moneda: "CLP",
    image: "fresas",
  },
  {
    id: generateProductID(),
    nombre: "Tornillo techo hexagonal 20' 100 unidades",
    descripcion: "Tornillo techo hexagonal 2' 100 unidades",
    cantidad: 200,
    precioUnitario: 16990,
    moneda: "CLP",
    image: "tornillo",
  },
  {
    id: generateProductID(),
    nombre: "Set de manguera 18 m verde",
    descripcion: "Set de manguera 18 m verde",
    cantidad: 200,
    precioUnitario: 13490,
    moneda: "CLP",
    image: "manguera",
  },
];

const fetchProductos = () => {
  return productosLista;
};

const fetchProductosID = (id) => {
  const productoEncontrado = _.filter(productosLista, { id });
  return productoEncontrado;
};

const agregaProducto = (
  nombre,
  descripcion,
  cantidad,
  precioUnitario,
  image,
  moneda = "CLP"
) => {
  let id = generateProductID();

  productosLista.push({
    id,
    nombre,
    descripcion,
    cantidad,
    precioUnitario,
    moneda,
    image,
  });
  return id;
};

const actualizaProducto = (id, datosObj) => {
  let copiaProductos = [...productosLista];
  const productoEncontrado = _.filter(copiaProductos, { id });

  if (productoEncontrado.length) {
    const index = _.findIndex(copiaProductos, productoEncontrado[0]);
    copiaProductos[index] = { id, ...copiaProductos[index], ...datosObj };
    productosLista = copiaProductos;
    return copiaProductos[index];
  }

  return [];
};

module.exports = {
  fetchProductos,
  fetchProductosID,
  agregaProducto,
  actualizaProducto,
};
