const Administradora = require("../models/administradora.model.js");

// Crear y guardar una nueva entidad de Administradora
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
  }

  // Crear una entidad de Administradora
  const administradora = new Administradora({
    nombre: req.body.nombre,
    numero_telefonico: req.body.numero_telefonico,
    correo: req.body.correo
  });

  // Guardar la entidad de Administradora en la base de datos
  Administradora.create(administradora, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al crear la entidad de Administradora."
      });
    else res.send(data);
  });
};

// Obtener todas las entidades de Administradora de la base de datos (con condición).
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  Administradora.getAll(nombre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al obtener las entidades de Administradora."
      });
    else res.send(data);
  });
};

// Encontrar una sola entidad de Administradora por su ID
exports.findOne = (req, res) => {
  Administradora.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró una entidad de Administradora con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error al obtener la entidad de Administradora con el ID " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Encontrar todas las entidades de Administradora publicadas
exports.findAllPublished = (req, res) => {
  Administradora.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al obtener las entidades de Administradora."
      });
    else res.send(data);
  });
};

// Actualizar una entidad de Administradora identificada por el ID en la solicitud
exports.update = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
  }

  console.log(req.body);

  Administradora.updateById(
    req.params.id,
    new Administradora(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontró una entidad de Administradora con el ID ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error al actualizar la entidad de Administradora con el ID " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Eliminar una entidad de Administradora con el ID especificado en la solicitud
exports.delete = (req, res) => {
  Administradora.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró una entidad de Administradora con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar la entidad de Administradora con el ID " + req.params.id
        });
      }
    } else res.send({ message: `¡La entidad de Administradora se eliminó correctamente!` });
  });
};

// Eliminar todas las entidades de Administradora de la base de datos.
exports.deleteAll = (req, res) => {
  Administradora.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al eliminar todas las entidades de Administradora."
      });
    else res.send({ message: `¡Todas las entidades de Administradora se eliminaron correctamente!` });
  });
};