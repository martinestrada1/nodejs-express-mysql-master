const sql = require("./db.js");

const Productobolsa = function(productobolsa) {
  this.nombre = productobolsa.nombre;
  this.marca = productobolsa.marca;
  this.modelo = productobolsa.modelo;
  this.precio = productobolsa.precio;
  this.foto = productobolsa.foto;
};

console.log(Productobolsa)
Productobolsa.create = (newProductobolsa, result) => {
  sql.query("INSERT INTO productobolsa SET ?", newProductobolsa, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created productobolsa: ", { id: res.insertId, ...newProductobolsa });
    result(null, { id: res.insertId, ...newProductobolsa });
  });
};

Productobolsa.findById = (id, result) => {
  sql.query(`SELECT * FROM productobolsa WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found productobolsa: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Productobolsa with the id
    result({ kind: "not_found" }, null);
  });
};

Productobolsa.getAll = (nombre, result) => {
  let query = "SELECT * FROM productobolsa";

  if (nombre) {
    query += " WHERE nombre LIKE '%${nombre}%'";
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("productobolsa: ", res);
    result(null, res);
  });
};

Productobolsa.updateById = (id, productobolsa, result) => {
  sql.query(
    "UPDATE productobolsa SET nombre = ?, marca = ?, modelo = ?, precio = ? WHERE id = ?",
    [productobolsa.nombre, productobolsa.marca, productobolsa.modelo, productobolsa.precio, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Productobolsa with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated productobolsa: ", { id: id, ...productobolsa });
      result(null, { id: id, ...productobolsa });
    }
  );
};

Productobolsa.remove = (id, result) => {
  sql.query("DELETE FROM productobolsa WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Productobolsa with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted productobolsa with id: ", id);
    result(null, res);
  });
};

Productobolsa.removeAll = result => {
  sql.query("DELETE FROM productobolsa", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} productobolsa`);
    result(null, res);
  });
};

module.exports = Productobolsa;
