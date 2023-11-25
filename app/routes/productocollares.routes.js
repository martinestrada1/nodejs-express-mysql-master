module.exports = app => {
    const productocollaresController = require("../controllers/productocollares.controller.js");
  
    var router = require("express").Router();
  
    // Crear un nuevo producto de collar
    router.post("/", productocollaresController.create);
  
    // Obtener todos los productos de collares
    router.get("/", productocollaresController.findAll);
  
    // Obtener un producto de collar por su ID
    router.get("/:id", productocollaresController.findOne);
  
    // Actualizar un producto de collar por su ID
    router.put("/:id", productocollaresController.update);
  
    // Borrar un producto de collar por su ID
    router.delete("/:id", productocollaresController.delete);
  
    app.use('/api/productocollares', router);
  };
  
  