const productosModel = require("./productosModel");
const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");

const generaVentaId = () => {
  return uuidv4();
};

const productos = productosModel.fetchProductos();

let ventasLista = [
  {
    id: generaVentaId(),
    productos: [
      {
        id: productos[0].id,
        precio: productos[0].precioUnitario,
        cantidad: 1,
        monto: productos[0].precioUnitario * 1,
      },
      {
        id: productos[2].id,
        precio: productos[2].precioUnitario,
        cantidad: 4,
        monto: productos[2].precioUnitario * 4,
      },
    ],
    montoTotal:
      productos[0].precioUnitario * 1 + productos[2].precioUnitario * 4,
    clienteId: 4,
    despachado: false,
    fecha: Date.now(),
  },
  {
    id: generaVentaId(),
    productos: [
      {
        id: productos[0].id,
        precio: productos[0].precioUnitario,
        cantidad: 3,
        monto: productos[0].precioUnitario * 3,
      },
    ],
    montoTotal: productos[0].precioUnitario * 3,
    clienteId: 23,
    despachado: false,
    fecha: Date.now(),
  },
  {
    id: generaVentaId(),
    productos: [
      {
        id: productos[3].id,
        precio: productos[3].precioUnitario,
        cantidad: 1,
        monto: productos[3].precioUnitario * 1,
      },
      {
        id: productos[2].id,
        precio: productos[2].precioUnitario,
        cantidad: 4,
        monto: productos[2].precioUnitario * 4,
      },
    ],
    montoTotal:
      productos[2].precioUnitario * 4 + productos[3].precioUnitario * 1,
    clienteId: 86,
    despachado: false,
    fecha: Date.now(),
  },
];

const fetchVentas = () => {
  return ventasLista;
};

const fetchVentasId = (id) => {
  const ventaEncontrada = _.filter(ventasLista, { id });
  return ventaEncontrada;
};

const registraVenta = (productos, montoTotal, clienteId) => {
  let id = generaVentaId();
  ventasLista.push({
    id,
    productos,
    montoTotal,
    clienteId,
    despachado: false,
    fecha: Date.now(),
  });
  return id;
};

const actualizaVenta = (id) => {
  let copiaVentasLista = [...ventasLista];
  const ventaEncontrada = _.filter(copiaVentasLista, { id });

  if (copiaVentasLista.length) {
    const index = _.findIndex(copiaVentasLista, ventaEncontrada[0]);
    copiaVentasLista[index] = { ...copiaVentasLista[index], despachado: true };
    ventasLista = copiaVentasLista;
    return copiaVentasLista[index];
  }

  return [];
};

module.exports = {
  fetchVentas,
  fetchVentasId,
  registraVenta,
  actualizaVenta,
};
