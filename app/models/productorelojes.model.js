const sql = require("./db.js");

const ProductoRelojes = function(producto) {
  this.nombre = producto.nombre;
  this.marca = producto.marca;
  this.modelo = producto.modelo;
  this.precio = producto.precio;
  this.foto = producto.foto;
};

ProductoRelojes.create = (newProducto, result) => {
  sql.query("INSERT INTO productorelojes SET ?", newProducto, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created productorelojes: ", { id: res.insertId, ...newProducto });
    result(null, { id: res.insertId, ...newProducto });
  });
};

ProductoRelojes.findById = (id, result) => {
  sql.query(`SELECT * FROM productorelojes WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found productorelojes: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found ProductoRelojes with the id
    result({ kind: "not_found" }, null);
  });
};

ProductoRelojes.getAll = (nombre, result) => {
  let query = "SELECT * FROM productorelojes";

  if (nombre) {
    query += ` WHERE nombre LIKE '%${nombre}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("productorelojes: ", res);
    result(null, res);
  });
};

ProductoRelojes.updateById = (id, producto, result) => {
  sql.query(
    "UPDATE productorelojes SET nombre = ?, marca = ?, modelo = ?, precio = ? WHERE id = ?",
    [producto.nombre, producto.marca, producto.modelo, producto.precio, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found ProductoRelojes with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated productorelojes: ", { id: id, ...producto });
      result(null, { id: id, ...producto });
    }
  );
};

ProductoRelojes.remove = (id, result) => {
  sql.query("DELETE FROM productorelojes WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found ProductoRelojes with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted productorelojes with id: ", id);
    result(null, res);
  });
};

ProductoRelojes.removeAll = result => {
  sql.query("DELETE FROM productorelojes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} productorelojes`);
    result(null, res);
  });
};

module.exports = ProductoRelojes;

