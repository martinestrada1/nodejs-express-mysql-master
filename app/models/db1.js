const mysql = require("mysql");
const dbConfig = require("../config/db.config1.js");

const pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

module.exports = {
  query: (queryText, values, callback) => {
    return pool.query(queryText, values, callback);
  },

  // Agregar funciones específicas para la tabla productobolsa
  getAllProductosBolsa: (callback) => {
    const queryText = "SELECT * FROM productobolsa";
    return pool.query(queryText, callback);
  },

  getProductoBolsaById: (id, callback) => {
    const queryText = "SELECT * FROM productobolsa WHERE id = ?";
    return pool.query(queryText, [id], callback);
  },

  insertProductoBolsa: (nombre, marca, modelo, precio, callback) => {
    const queryText = "INSERT INTO productobolsa (nombre, marca, modelo, precio) VALUES (?, ?, ?, ?)";
    return pool.query(queryText, [nombre, marca, modelo, precio], callback);
  },

  updateProductoBolsa: (id, nombre, marca, modelo, precio, callback) => {
    const queryText = "UPDATE productobolsa SET nombre = ?, marca = ?, modelo = ?, precio = ? WHERE id = ?";
    return pool.query(queryText, [nombre, marca, modelo, precio, id], callback);
  },

  deleteProductoBolsa: (id, callback) => {
    const queryText = "DELETE FROM productobolsa WHERE id = ?";
    return pool.query(queryText, [id], callback);
  }
};


