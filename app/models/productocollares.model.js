const sql = require("./db.js");

const Productocollares = function(producto) {
  this.nombre = producto.nombre;
  this.marca = producto.marca;
  this.modelo = producto.modelo;
  this.precio = producto.precio;
  this.foto = producto.foto;
};

Productocollares.create = (newProductocollares, result) => {
  sql.query("INSERT INTO productocollares SET ?", newProductocollares, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created productocollares: ", { id: res.insertId, ...newProductocollares });
    result(null, { id: res.insertId, ...newProductocollares });
  });
};

Productocollares.findById = (id, result) => {
  sql.query(`SELECT * FROM productocollares WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found productocollares: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Productocollares with the id
    result({ kind: "not_found" }, null);
  });
};

Productocollares.getAll = (nombre, result) => {
  let query = "SELECT * FROM productocollares";

  if (nombre) {
    query += ` WHERE nombre LIKE '%${nombre}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("productocollares: ", res);
    result(null, res);
  });
};

Productocollares.updateById = (id, producto, result) => {
  sql.query(
    "UPDATE productocollares SET nombre = ?, marca = ?, modelo = ?, precio = ? WHERE id = ?",
    [producto.nombre, producto.marca, producto.modelo, producto.precio, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Productocollares with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated productocollares: ", { id: id, ...producto });
      result(null, { id: id, ...producto });
    }
  );
};

Productocollares.remove = (id, result) => {
  sql.query("DELETE FROM productocollares WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Productocollares with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted productocollares with id: ", id);
    result(null, res);
  });
};

Productocollares.removeAll = result => {
  sql.query("DELETE FROM productocollares", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} productocollares`);
    result(null, res);
  });
};

module.exports = Productocollares;

