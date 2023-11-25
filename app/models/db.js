const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

var pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

module.exports = {
  // Consulta para obtener todas las administradoras
  getAllAdministradoras: (callback) => {
    const queryText = "SELECT * FROM administradora";
    return pool.query(queryText, callback);
  },
  
  // Consulta para obtener una administradora por su ID
  getAdministradoraById: (id, callback) => {
    const queryText = "SELECT * FROM administradora WHERE id = ?";
    return pool.query(queryText, [id], callback);
  },
  
  // Consulta para crear una nueva administradora
  createAdministradora: (administradora, callback) => {
    const queryText = "INSERT INTO administradora (nombre, numero_telefonico, correo) VALUES (?, ?, ?)";
    return pool.query(queryText, [administradora.nombre, administradora.numero_telefonico, administradora.correo], callback);
  },
  
  // Consulta para actualizar una administradora por su ID
  updateAdministradora: (id, administradora, callback) => {
    const queryText = "UPDATE administradora SET nombre = ?, numero_telefonico = ?, correo = ? WHERE id = ?";
    return pool.query(queryText, [administradora.nombre, administradora.numero_telefonico, administradora.correo, id], callback);
  },
  
  // Consulta para eliminar una administradora por su ID
  deleteAdministradora: (id, callback) => {
    const queryText = "DELETE FROM administradora WHERE id = ?";
    return pool.query(queryText, [id], callback);
  }
};

module.exports=pool;
