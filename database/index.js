const sql = require("mssql");

var config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB,
  options: {
    encrypt: true,
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Conectado a SQL Server!");
    return pool;
  })
  .catch((err) => {
    console.log("Conexion a base de datos fallida: ", err);
  });

module.exports = {
  sql,
  poolPromise,
};
