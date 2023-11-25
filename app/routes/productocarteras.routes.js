// Express route setup
module.exports = app => {
    const productocarterasController = require("../controllers/productocarteras.controller.js");
  
    var router = require("express").Router();
  
    // Crear un nuevo producto de carteras
    router.post("/", productocarterasController.create);
  
    // Obtener todos los productos de carteras
    router.get("/", productocarterasController.findAll);
  
    // Obtener un producto de carteras por su ID
    router.get("/:id", productocarterasController.findOne);
  
    // Actualizar un producto de carteras por su ID
    router.put("/:id", productocarterasController.update);
  
    // Borrar un producto de carteras por su ID
    router.delete("/:id", productocarterasController.delete);
  
    app.use('/api/productocarteras', router);
  };
  