const sql = require("./db.js");

const ProductoCarteras = function(producto) {
  this.nombre = producto.nombre;
  this.marca = producto.marca;
  this.modelo = producto.modelo;
  this.precio = producto.precio;
  this.foto = producto.foto
};

ProductoCarteras.create = (newProducto, result) => {
  sql.query("INSERT INTO productocarteras SET ?", newProducto, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created productocarteras: ", { id: res.insertId, ...newProducto });
    result(null, { id: res.insertId, ...newProducto });
  });
};

ProductoCarteras.findById = (id, result) => {
  sql.query(`SELECT * FROM productocarteras WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found productocarteras: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found ProductoCarteras with the id
    result({ kind: "not_found" }, null);
  });
};

ProductoCarteras.getAll = (nombre, result) => {
  let query = "SELECT * FROM productocarteras";

  if (nombre) {
    query += ` WHERE nombre LIKE '%${nombre}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("productocarteras: ", res);
    result(null, res);
  });
};

ProductoCarteras.updateById = (id, producto, result) => {
  sql.query(
    "UPDATE productocarteras SET nombre = ?, marca = ?, modelo = ?, precio = ? WHERE id = ?",
    [producto.nombre, producto.marca, producto.modelo, producto.precio, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found ProductoCarteras with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated productocarteras: ", { id: id, ...producto });
      result(null, { id: id, ...producto });
    }
  );
};

ProductoCarteras.remove = (id, result) => {
  sql.query("DELETE FROM productocarteras WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found ProductoCarteras with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted productocarteras with id: ", id);
    result(null, res);
  });
};

ProductoCarteras.removeAll = result => {
  sql.query("DELETE FROM productocarteras", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} productocarteras`);
    result(null, res);
  });
};

module.exports = ProductoCarteras;
