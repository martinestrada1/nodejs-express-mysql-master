// Express route setup
module.exports = app => {
    const productorelojesController = require("../controllers/productorelojes.controller.js");
  
    var router = require("express").Router();
  
    // Crear un nuevo reloj
    router.post("/", productorelojesController.create);
  
    // Obtener todos los relojes
    router.get("/", productorelojesController.findAll);
  
    // Obtener un reloj por su ID
    router.get("/:id", productorelojesController.findOne);
  
    // Actualizar un reloj por su ID
    router.put("/:id", productorelojesController.update);
  
    // Borrar un reloj por su ID
    router.delete("/:id", productorelojesController.delete);
  
    app.use('/api/productorelojes', router);
  };
  