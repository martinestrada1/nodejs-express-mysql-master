// Express route setup
module.exports = app => {
  const administradora = require("../controllers/administradora.controller.js");

  var router = require("express").Router();

  // Crear una nueva administradora
  router.post("/", administradora.create);

  // Obtener todas las administradoras
  router.get("/", administradora.findAll);

  // Obtener una administradora por su ID
  router.get("/:id", administradora.findOne);

  // Actualizar una administradora por su ID
  router.put("/:id", administradora.update);

  // Borrar una administradora por su ID
  router.delete("/:id", administradora.delete);

  app.use('/api/administradora', router);
};
