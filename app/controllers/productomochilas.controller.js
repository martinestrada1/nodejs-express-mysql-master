const ProductoMochilas = require("../models/productomochilas.model.js");

// Crear y guardar un nuevo producto de mochila
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
  }

  // Crear un producto de mochila
  const productoMochila = new ProductoMochilas({
    nombre: req.body.nombre,
    marca: req.body.marca,
    modelo: req.body.modelo,
    precio: req.body.precio,
    foto: req.body.foto
  });

  // Guardar el producto de mochila en la base de datos
  ProductoMochilas.create(productoMochila, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al crear el producto de mochila."
      });
    else res.send(data);
  });
};

// Obtener todos los productos de mochila de la base de datos (con condición).
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  ProductoMochilas.getAll(nombre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al obtener los productos de mochila."
      });
    else res.send(data);
  });
};

// Encontrar un solo producto de mochila por su ID
exports.findOne = (req, res) => {
  ProductoMochilas.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró un producto de mochila con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error al obtener el producto de mochila con el ID " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Actualizar un producto de mochila identificado por el ID en la solicitud
exports.update = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
  }

  ProductoMochilas.updateById(
    req.params.id,
    new ProductoMochilas(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontró un producto de mochila con el ID ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error al actualizar el producto de mochila con el ID " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Eliminar un producto de mochila con el ID especificado en la solicitud
exports.delete = (req, res) => {
  ProductoMochilas.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró un producto de mochila con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar el producto de mochila con el ID " + req.params.id
        });
      }
    } else res.send({ message: `¡El producto de mochila se eliminó correctamente!` });
  });
};

// Eliminar todos los productos de mochila de la base de datos.
exports.deleteAll = (req, res) => {
  ProductoMochilas.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al eliminar todos los productos de mochila."
      });
    else res.send({ message: `¡Todos los productos de mochila se eliminaron correctamente!` });
  });
};
