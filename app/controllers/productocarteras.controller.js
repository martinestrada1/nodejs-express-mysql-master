const Productocarteras = require("../models/productocarteras.model.js");

// Crear y guardar un nuevo producto de cartera
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
    return;
  }

  // Crear un producto de cartera
  const productocartera = new Productocarteras({
    nombre: req.body.nombre,
    marca: req.body.marca,
    modelo: req.body.modelo,
    precio: req.body.precio,
    foto: req.body.foto
  });

  // Guardar el producto de cartera en la base de datos
  Productocarteras.create(productocartera, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al crear el producto de cartera."
      });
    else res.send(data);
  });
};

// Obtener todos los productos de cartera de la base de datos (con condición).
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  Productocarteras.getAll(nombre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al obtener los productos de cartera."
      });
    else res.send(data);
  });
};

// Encontrar un solo producto de cartera por su ID
exports.findOne = (req, res) => {
  Productocarteras.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró un producto de cartera con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error al obtener el producto de cartera con el ID " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Actualizar un producto de cartera identificado por el ID en la solicitud
exports.update = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
    return;
  }

  Productocarteras.updateById(
    req.params.id,
    new Productocarteras(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontró un producto de cartera con el ID ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error al actualizar el producto de cartera con el ID " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Eliminar un producto de cartera con el ID especificado en la solicitud
exports.delete = (req, res) => {
  Productocarteras.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró un producto de cartera con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar el producto de cartera con el ID " + req.params.id
        });
      }
    } else res.send({ message: `¡El producto de cartera se eliminó correctamente!` });
  });
};

// Eliminar todos los productos de cartera de la base de datos.
exports.deleteAll = (req, res) => {
  Productocarteras.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al eliminar todos los productos de cartera."
      });
    else res.send({ message: `¡Todos los productos de cartera se eliminaron correctamente!` });
  });
};
