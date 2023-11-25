const ProductoBolsa = require("../models/productobolsa.model.js");

// Crear y guardar un nuevo producto en la tabla productobolsa
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
  }

  // Crear un producto en la tabla productobolsa
  const producto = new ProductoBolsa({
    nombre: req.body.nombre,
    marca: req.body.marca,
    modelo: req.body.modelo,
    precio: req.body.precio,
    foto: req.body.foto
  });

  // Guardar el producto en la tabla productobolsa en la base de datos
  ProductoBolsa.create(producto, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al crear el producto en la tabla productobolsa."
      });
    else res.send(data);
  });
};

// Obtener todos los productos de la tabla productobolsa de la base de datos (con condición).
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  ProductoBolsa.getAll(nombre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al obtener los productos de la tabla productobolsa."
      });
    else res.send(data);
  });
};

// Encontrar un solo producto por su ID
exports.findOne = (req, res) => {
  ProductoBolsa.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró un producto en la tabla productobolsa con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error al obtener el producto en la tabla productobolsa con el ID " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Actualizar un producto identificado por el ID en la solicitud
exports.update = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
  }

  console.log(req.body);

  ProductoBolsa.updateById(
    req.params.id,
    new ProductoBolsa(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontró un producto en la tabla productobolsa con el ID ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error al actualizar el producto en la tabla productobolsa con el ID " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Eliminar un producto con el ID especificado en la solicitud
exports.delete = (req, res) => {
  ProductoBolsa.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró un producto en la tabla productobolsa con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar el producto en la tabla productobolsa con el ID " + req.params.id
        });
      }
    } else res.send({ message: `¡El producto en la tabla productobolsa se eliminó correctamente!` });
  });
};

// Eliminar todos los productos de la tabla productobolsa de la base de datos.
exports.deleteAll = (req, res) => {
  ProductoBolsa.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al eliminar todos los productos de la tabla productobolsa."
      });
    else res.send({ message: `¡Todos los productos de la tabla productobolsa se eliminaron correctamente!` });
  });
};
