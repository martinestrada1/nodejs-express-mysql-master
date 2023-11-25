const Proveedor = require("../models/proveedor.model.js");

// Crear y guardar una nueva entidad de Proveedor
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
  }

  // Crear una entidad de Proveedor
  const proveedor = new Proveedor({
    nombre:req.body.nombre,
    apellido: req.body.apellido,
    numero_telefonico: req.body.numero_telefonico,
    correo: req.body.correo,
    marca: req.body.marca,
    modelo: req.body.modelo
  });

  // Guardar la entidad de Proveedor en la base de datos
  Proveedor.create(proveedor, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al crear la entidad de Proveedor."
      });
    else res.send(data);
  });
};

// Obtener todas las entidades de Proveedor de la base de datos (con condición).
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  Proveedor.getAll(nombre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al obtener las entidades de Proveedor."
      });
    else res.send(data);
  });
};

// Encontrar una sola entidad de Proveedor por su ID
exports.findOne = (req, res) => {
  Proveedor.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró una entidad de Proveedor con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error al obtener la entidad de Proveedor con el ID " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Encontrar todas las entidades de Proveedor publicadas
exports.findAllPublished = (req, res) => {
  Proveedor.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al obtener las entidades de Proveedor."
      });
    else res.send(data);
  });
};

// Actualizar una entidad de Proveedor identificada por el ID en la solicitud
exports.update = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
  }

  console.log(req.body);

  Proveedor.updateById(
    req.params.id,
    new Proveedor(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontró una entidad de Proveedor con el ID ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error al actualizar la entidad de Proveedor con el ID " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Eliminar una entidad de Proveedor con el ID especificado en la solicitud
exports.delete = (req, res) => {
  Proveedor.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró una entidad de Proveedor con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar la entidad de Proveedor con el ID " + req.params.id
        });
      }
    } else res.send({ message: `¡La entidad de Proveedor se eliminó correctamente!` });
  });
};

// Eliminar todas las entidades de Proveedor de la base de datos.
exports.deleteAll = (req, res) => {
  Proveedor.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al eliminar todas las entidades de Proveedor."
      });
    else res.send({ message: `¡Todas las entidades de Proveedor se eliminaron correctamente!` });
  });
};
