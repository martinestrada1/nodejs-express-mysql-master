// Express route setup
module.exports = app => {
    const productobolsa = require("../controllers/productobolsa.controller.js");
  
    var router = require("express").Router();
  
    // Crear un nuevo producto en la bolsa
    router.post("/", productobolsa.create);
  
    // Obtener todos los productos en la bolsa
    router.get("/", productobolsa.findAll);
  
    // Obtener un producto en la bolsa por su ID
    router.get("/:id", productobolsa.findOne);
  
    // Actualizar un producto en la bolsa por su ID
    router.put("/:id", productobolsa.update);
  
    // Borrar un producto de la bolsa por su ID
    router.delete("/:id", productobolsa.delete);
  
    app.use('/api/productobolsa', router);
  };
  