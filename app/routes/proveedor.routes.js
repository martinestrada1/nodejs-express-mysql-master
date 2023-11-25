// Express route setup
module.exports = app => {
    const proveedor = require("../controllers/proveedor.controller.js"); // Cambiar el nombre del controlador si es necesario
  
    var router = require("express").Router();
  
    // Crear un nuevo proveedor
    router.post("/", proveedor.create);
  
    // Obtener todos los proveedores
    router.get("/", proveedor.findAll);
  
    // Obtener un proveedor por su ID
    router.get("/:id", proveedor.findOne);
  
    // Actualizar un proveedor por su ID
    router.put("/:id", proveedor.update);
  
    // Borrar un proveedor por su ID
    router.delete("/:id", proveedor.delete);
  
    app.use('/api/proveedor', router); // Cambiar la ruta si es necesario
  };
  