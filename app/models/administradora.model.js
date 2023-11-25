const sql = require("./db.js");

const Administradora = function(administradora) {
  this.nombre = administradora.nombre;
  this.numero_telefonico = administradora.numero_telefonico;
  this.correo = administradora.correo;
};

Administradora.create = (newAdministradora, result) => {
  sql.query("INSERT INTO administradora SET ?", newAdministradora, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created administradora: ", { id: res.insertId, ...newAdministradora });
    result(null, { id: res.insertId, ...newAdministradora });
  });
};

Administradora.findById = (id, result) => {
  sql.query(`SELECT * FROM administradora WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found administradora: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Administradora with the id
    result({ kind: "not_found" }, null);
  });
};

Administradora.getAll = (nombre, result) => {
  let query = "SELECT * FROM administradora";

  if (nombre) {
    query += ` WHERE nombre LIKE '%${nombre}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("administradoras: ", res);
    result(null, res);
  });
};

Administradora.updateById = (id, administradora, result) => {
  sql.query(
    "UPDATE administradora SET nombre = ?, numero_telefonico = ?, correo = ? WHERE id = ?",
    [administradora.nombre, administradora.numero_telefonico, administradora.correo, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Administradora with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated administradora: ", { id: id, ...administradora });
      result(null, { id: id, ...administradora });
    }
  );
};

Administradora.remove = (id, result) => {
  sql.query("DELETE FROM administradora WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Administradora with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted administradora with id: ", id);
    result(null, res);
  });
};

Administradora.removeAll = result => {
  sql.query("DELETE FROM administradora", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} administradora`);
    result(null, res);
  });
};

module.exports = Administradora;
