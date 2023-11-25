const sql = require("./db.js");

const Usuario = function(usuario) {
  this.nombre = usuario.nombre;
  this.apellido = usuario.apellido;
  this.correo = usuario.correo;
  this.numero_telefonico = usuario.numero_telefonico;
  this.saldo = usuario.saldo;
};

Usuario.create = (newUsuario, result) => {
  sql.query("INSERT INTO usuario SET ?", newUsuario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created usuario: ", { id: res.insertId, ...newUsuario });
    result(null, { id: res.insertId, ...newUsuario });
  });
};

Usuario.findById = (id, result) => {
  sql.query(`SELECT * FROM usuario WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found usuario: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Usuario with the id
    result({ kind: "not_found" }, null);
  });
};

Usuario.getAll = (nombre, result) => {
  let query = "SELECT * FROM usuario";

  if (nombre) {
    query += ` WHERE nombre LIKE '%${nombre}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("usuarios: ", res);
    result(null, res);
  });
};

Usuario.updateById = (id, usuario, result) => {
  sql.query(
    "UPDATE usuario SET nombre = ?, apellido = ?, correo = ?, numero_telefonico = ?, saldo = ? WHERE id = ?",
    [usuario.nombre, usuario.apellido, usuario.correo, usuario.numero_telefonico, usuario.saldo, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Usuario with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated usuario: ", { id: id, ...usuario });
      result(null, { id: id, ...usuario });
    }
  );
};

Usuario.remove = (id, result) => {
  sql.query("DELETE FROM usuario WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Usuario with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted usuario with id: ", id);
    result(null, res);
  });
};

Usuario.removeAll = result => {
  sql.query("DELETE FROM usuario", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} usuarios`);
    result(null, res);
  });
};

module.exports = Usuario;
