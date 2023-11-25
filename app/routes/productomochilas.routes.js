// Express route setup
module.exports = app => {
    const productomochilasController = require("../controllers/productomochilas.controller.js");
  
    var router = require("express").Router();
  
    // Crear un nuevo producto de mochila
    router.post("/", productomochilasController.create);
  
    // Obtener todos los productos de mochila
    router.get("/", productomochilasController.findAll);
  
    // Obtener un producto de mochila por su ID
    router.get("/:id", productomochilasController.findOne);
  
    // Actualizar un producto de mochila por su ID
    router.put("/:id", productomochilasController.update);
  
    // Borrar un producto de mochila por su ID
    router.delete("/:id", productomochilasController.delete);
  
    app.use('/api/productomochilas', router);
  };
  