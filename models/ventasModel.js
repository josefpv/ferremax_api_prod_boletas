const productosModel = require("./productosModel");
const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");
const { poolPromise, sql } = require("../database");

const generaVentaId = () => {
  return uuidv4();
};

const fetchVentas = async () => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .query(
      "SELECT v.id, c.RazonSocial, v.monto_total, v.despachado, FORMAT(v.fecha, 'dd-MM-yyyy HH:mm') fecha FROM ventas v LEFT JOIN Cliente c ON c.Id = v.cliente_id ;"
    );

  return result.recordset;
};

const fetchVentasId = async (id) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .query(
      "SELECT v.id, c.RazonSocial, v.monto_total, v.despachado, FORMAT(v.fecha, 'dd-MM-yyyy HH:mm') fecha FROM ventas v LEFT JOIN Cliente c ON c.Id = v.cliente_id WHERE v.id = @id;"
    );

  console.log(result);
  return result.recordset;
};

const fetchProductosVenta = async (ventaId) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("id", sql.Int, ventaId)
    .query(
      "SELECT vp.id, vp.venta_id, vp.producto_id, p.nombre, vp.cantidad, vp.total FROM ventas_productos vp LEFT JOIN productos p ON vp.producto_id  = p.id WHERE vp.venta_id = @id;"
    );

  return result.recordset;
};

const registraVentaProducto = async (ventaId, productoId, cantidad, total) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("ventaId", sql.Int, ventaId)
    .input("productoId", sql.Int, productoId)
    .input("cantidad", sql.Int, cantidad)
    .input("total", sql.Int, total)
    .query(
      "INSERT INTO ventas_productos (venta_id, producto_id, cantidad, total) VALUES (@ventaId, @productoId, @cantidad, @total); SELECT SCOPE_IDENTITY() AS id;"
    );

  return result.recordset[0].id;
};

const registraVenta = async (montoTotal, clienteId, despachado, fecha) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("montoTotal", sql.Int, montoTotal)
    .input("clienteId", sql.Int, clienteId)
    .input("despachado", sql.Int, despachado)
    .input("fecha", sql.DateTime, fecha)
    .query(
      "INSERT INTO ventas (monto_total, cliente_id, despachado, fecha) VALUES (@montoTotal, @clienteId, @despachado, @fecha); SELECT SCOPE_IDENTITY() AS id;"
    );

  return result.recordset[0].id;
};

const actualizaVenta = async (id, despachado) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("despachado", sql.Int, despachado)
    .input("id", sql.Int, id)
    .query("UPDATE ventas SET despachado = @despachado WHERE id = @id;");

  return id;
};

module.exports = {
  fetchVentas,
  fetchVentasId,
  registraVenta,
  actualizaVenta,
  registraVentaProducto,
  fetchProductosVenta,
};
