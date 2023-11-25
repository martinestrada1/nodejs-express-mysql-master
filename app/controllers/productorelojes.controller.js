const Productorelojes = require("../models/productorelojes.model.js");

// Crear y guardar un nuevo producto de relojes
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
  }

  // Crear un producto de relojes
  const productorelojes = new Productorelojes({
    nombre: req.body.nombre,
    marca: req.body.marca,
    modelo: req.body.modelo,
    precio: req.body.precio,
    foto: req.body.foto
  });

  // Guardar el producto de relojes en la base de datos
  Productorelojes.create(productorelojes, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al crear el producto de relojes."
      });
    else res.send(data);
  });
};

// Obtener todos los productos de relojes de la base de datos (con condición).
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  Productorelojes.getAll(nombre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al obtener los productos de relojes."
      });
    else res.send(data);
  });
};

// Encontrar un solo producto de relojes por su ID
exports.findOne = (req, res) => {
  Productorelojes.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró un producto de relojes con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error al obtener el producto de relojes con el ID " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Encontrar todos los productos de relojes publicados
exports.findAllPublished = (req, res) => {
  Productorelojes.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al obtener los productos de relojes."
      });
    else res.send(data);
  });
};

// Actualizar un producto de relojes identificado por el ID en la solicitud
exports.update = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
  }

  console.log(req.body);

  Productorelojes.updateById(
    req.params.id,
    new Productorelojes(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontró un producto de relojes con el ID ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error al actualizar el producto de relojes con el ID " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Eliminar un producto de relojes con el ID especificado en la solicitud
exports.delete = (req, res) => {
  Productorelojes.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró un producto de relojes con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar el producto de relojes con el ID " + req.params.id
        });
      }
    } else res.send({ message: `¡El producto de relojes se eliminó correctamente!` });
  });
};

// Eliminar todos los productos de relojes de la base de datos.
exports.deleteAll = (req, res) => {
  Productorelojes.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al eliminar todos los productos de relojes."
      });
    else res.send({ message: `¡Todos los productos de relojes se eliminaron correctamente!` });
  });
};

