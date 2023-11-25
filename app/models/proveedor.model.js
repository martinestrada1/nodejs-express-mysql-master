const sql = require("./db.js");

const Proveedor = function(proveedor) {
  this.nombre = proveedor.nombre;
  this.apellido = proveedor.apellido;
  this.numero_telefonico = proveedor.numero_telefonico;
  this.correo = proveedor.correo;
  this.marca = proveedor.marca;
  this.modelo = proveedor.modelo;
};

Proveedor.create = (newProveedor, result) => {
  sql.query("INSERT INTO proveedor SET ?", newProveedor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created proveedor: ", { id: res.insertId, ...newProveedor });
    result(null, { id: res.insertId, ...newProveedor });
  });
};

Proveedor.findById = (id, result) => {
  sql.query(`SELECT * FROM proveedor WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found proveedor: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Proveedor with the id
    result({ kind: "not_found" }, null);
  });
};

Proveedor.getAll = (nombre, result) => {
  let query = "SELECT * FROM proveedor";

  if (nombre) {
    query += ` WHERE nombre LIKE '%${nombre}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("proveedores: ", res);
    result(null, res);
  });
};

Proveedor.updateById = (id, proveedor, result) => {
  sql.query(
    "UPDATE proveedor SET nombre = ?, apellido = ?, numero_telefonico = ?, correo = ?, marca = ?, modelo = ? WHERE id = ?",
    [proveedor.nombre, proveedor.apellido, proveedor.numero_telefonico, proveedor.correo, proveedor.marca, proveedor.modelo, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Proveedor with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated proveedor: ", { id: id, ...proveedor });
      result(null, { id: id, ...proveedor });
    }
  );
};

Proveedor.remove = (id, result) => {
  sql.query("DELETE FROM proveedor WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Proveedor with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted proveedor with id: ", id);
    result(null, res);
  });
};

Proveedor.removeAll = result => {
  sql.query("DELETE FROM proveedor", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} proveedores`);
    result(null, res);
  });
};

module.exports = Proveedor;
