const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");
const { poolPromise, sql } = require("./../database");

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

const fetchProductos = async () => {
  const pool = await poolPromise;
  const result = await pool.request().query("SELECT * FROM productos;");
  return result.recordset;
};

const fetchProductosID = async (id) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .query("SELECT * FROM productos WHERE id = @id;");
  return result.recordset;
  //const productoEncontrado = _.filter(productosLista, { id });
  //return productoEncontrado;
};

const agregaProducto = async (
  nombre,
  descripcion,
  cantidad,
  precioUnitario,
  image,
  moneda = "CLP"
) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("nombre", sql.VarChar, nombre)
    .input("descripcion", sql.VarChar, descripcion)
    .input("cantidad", sql.Int, cantidad)
    .input("precioUnitario", sql.Int, precioUnitario)
    .input("imagen", sql.VarChar, image)
    .input("moneda", sql.VarChar, moneda)
    .query(
      "INSERT INTO productos (nombre, descripcion, cantidad, precio_unitario, moneda, imagen) VALUES (@nombre, @descripcion, @cantidad, @precioUnitario, @moneda, @imagen); SELECT SCOPE_IDENTITY() AS id;"
    );

  return result.recordset[0].id;
};

const actualizaProducto = async (
  id,
  nombre,
  descripcion,
  cantidad,
  precioUnitario
) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .input("nombre", sql.VarChar, nombre)
    .input("descripcion", sql.VarChar, descripcion)
    .input("cantidad", sql.Int, cantidad)
    .input("precioUnitario", sql.Int, precioUnitario)
    .query(
      "UPDATE productos SET nombre = @nombre, descripcion = @descripcion, cantidad =  @cantidad, precio_unitario = @precioUnitario WHERE id = @id;"
    );

  return result.rowsAffected[0];
};

module.exports = {
  fetchProductos,
  fetchProductosID,
  agregaProducto,
  actualizaProducto,
};
