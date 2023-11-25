// Express route setup
module.exports = app => {
    const usuarioController = require("../controllers/usuario.controller.js");
  
    var router = require("express").Router();
  
    // Crear un nuevo usuario
    router.post("/", usuarioController.create);
  
    // Obtener todos los usuarios
    router.get("/", usuarioController.findAll);
  
    // Obtener un usuario por su ID
    router.get("/:id", usuarioController.findOne);
  
    // Actualizar un usuario por su ID
    router.put("/:id", usuarioController.update);
  
    // Borrar un usuario por su ID
    router.delete("/:id", usuarioController.delete);
  
    app.use('/api/usuario', router);
  };
  