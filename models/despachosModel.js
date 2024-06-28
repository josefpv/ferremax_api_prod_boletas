const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");
const { poolPromise, sql } = require("./../database");

const generateDespachoID = () => {
  return uuidv4();
};

let listaDespachos = [];

const fetchDespachos = async () => {
  const pool = await poolPromise;
  const result = await pool.request().query("SELECT * FROM despachos;");

  return result.recordset;
};

const fetchDespachoId = async (id) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .query("SELECT * FROM despachos WHERE id = @id;");

  return result.recordset;
};

const agregaDespacho = async (idVenta) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("idVenta", sql.Int, idVenta)
    .input("idDespachador", sql.VarChar, generateDespachoID())
    .input("idRuta", sql.VarChar, generateDespachoID())
    .input("despachado", sql.Int, 1)
    .query(
      "INSERT INTO despachos (id_venta, id_despachador, id_ruta, despachado) VALUES (@idVenta, @idDespachador, @idRuta, @despachado);  SELECT SCOPE_IDENTITY() AS id; "
    );

  return result.recordset[0].id;
};

const actualizaDespacho = async (id) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .query("UPDATE despachos SET despachado = 1 WHERE id = @id;");

  return result.rowsAffected[0];
};

module.exports = {
  fetchDespachos,
  fetchDespachoId,
  agregaDespacho,
  actualizaDespacho,
};
