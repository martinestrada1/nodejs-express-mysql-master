const ProductoCollar = require("../models/productocollares.model.js");

// Crear y guardar un nuevo producto de collar
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
  }

  // Crear un producto de collar
  const productocollar = new ProductoCollar({
    nombre: req.body.nombre,
    marca: req.body.marca,
    modelo: req.body.modelo,
    precio: req.body.precio,
    foto: req.body.foto
  });

  // Guardar el producto de collar en la base de datos
  ProductoCollar.create(productocollar, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al crear el producto de collar."
      });
    else res.send(data);
  });
};

// Obtener todos los productos de collar de la base de datos (con condición).
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  ProductoCollar.getAll(nombre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al obtener los productos de collar."
      });
    else res.send(data);
  });
};

// Encontrar un solo producto de collar por su ID
exports.findOne = (req, res) => {
  ProductoCollar.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró un producto de collar con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error al obtener el producto de collar con el ID " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Actualizar un producto de collar identificado por el ID en la solicitud
exports.update = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
  }

  console.log(req.body);

  ProductoCollar.updateById(
    req.params.id,
    new ProductoCollar(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontró un producto de collar con el ID ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error al actualizar el producto de collar con el ID " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Eliminar un producto de collar con el ID especificado en la solicitud
exports.delete = (req, res) => {
  ProductoCollar.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró un producto de collar con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar el producto de collar con el ID " + req.params.id
        });
      }
    } else res.send({ message: `¡El producto de collar se eliminó correctamente!` });
  });
};

// Eliminar todos los productos de collar de la base de datos.
exports.deleteAll = (req, res) => {
  ProductoCollar.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al eliminar todos los productos de collar."
      });
    else res.send({ message: `¡Todos los productos de collar se eliminaron correctamente!` });
  });
};
