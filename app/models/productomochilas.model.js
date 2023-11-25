const sql = require("./db.js");

const ProductoMochilas = function(productoMochila) {
  this.nombre = productoMochila.nombre;
  this.marca = productoMochila.marca;
  this.modelo = productoMochila.modelo;
  this.precio = productoMochila.precio;
  this.foto = producto.foto;
};

ProductoMochilas.create = (newProductoMochila, result) => {
  sql.query("INSERT INTO productomochilas SET ?", newProductoMochila, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created productomochila: ", { id: res.insertId, ...newProductoMochila });
    result(null, { id: res.insertId, ...newProductoMochila });
  });
};

ProductoMochilas.findById = (id, result) => {
  sql.query(`SELECT * FROM productomochilas WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found productomochila: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found ProductoMochilas with the id
    result({ kind: "not_found" }, null);
  });
};

ProductoMochilas.getAll = (nombre, result) => {
  let query = "SELECT * FROM productomochilas";

  if (nombre) {
    query += ` WHERE nombre LIKE '%${nombre}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("productomochilas: ", res);
    result(null, res);
  });
};

ProductoMochilas.updateById = (id, productoMochila, result) => {
  sql.query(
    "UPDATE productomochilas SET nombre = ?, marca = ?, modelo = ?, precio = ? WHERE id = ?",
    [productoMochila.nombre, productoMochila.marca, productoMochila.modelo, productoMochila.precio, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found ProductoMochilas with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated productomochila: ", { id: id, ...productoMochila });
      result(null, { id: id, ...productoMochila });
    }
  );
};

ProductoMochilas.remove = (id, result) => {
  sql.query("DELETE FROM productomochilas WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found ProductoMochilas with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted productomochila with id: ", id);
    result(null, res);
  });
};

ProductoMochilas.removeAll = result => {
  sql.query("DELETE FROM productomochilas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} productomochilas`);
    result(null, res);
  });
};

module.exports = ProductoMochilas;
