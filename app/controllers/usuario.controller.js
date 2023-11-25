const Usuario = require("../models/usuario.model.js");

// Crear y guardar un nuevo usuario
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
  }

  // Crear un usuario
  const usuario = new Usuario({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    correo: req.body.correo,
    numero_telefonico: req.body.numero_telefonico,
    saldo: req.body.saldo
  });

  // Guardar el usuario en la base de datos
  Usuario.create(usuario, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al crear el usuario."
      });
    else res.send(data);
  });
};

// Obtener todos los usuarios de la base de datos (con condición).
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  Usuario.getAll(nombre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al obtener los usuarios."
      });
    else res.send(data);
  });
};

// Encontrar un solo usuario por su ID
exports.findOne = (req, res) => {
  Usuario.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró un usuario con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error al obtener el usuario con el ID " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Encontrar todos los usuarios publicados
exports.findAllPublished = (req, res) => {
  Usuario.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al obtener los usuarios."
      });
    else res.send(data);
  });
};

// Actualizar un usuario identificado por el ID en la solicitud
exports.update = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
  }

  Usuario.updateById(
    req.params.id,
    new Usuario(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontró un usuario con el ID ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error al actualizar el usuario con el ID " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Eliminar un usuario con el ID especificado en la solicitud
exports.delete = (req, res) => {
  Usuario.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró un usuario con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar el usuario con el ID " + req.params.id
        });
      }
    } else res.send({ message: `¡El usuario se eliminó correctamente!` });
  });
};

// Eliminar todos los usuarios de la base de datos.
exports.deleteAll = (req, res) => {
  Usuario.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al eliminar todos los usuarios."
      });
    else res.send({ message: `¡Todos los usuarios se eliminaron correctamente!` });
  });
};
