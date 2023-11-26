const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la aplicación de administradora." });
});

require("./app/routes/administradora.routes.js")(app);
require("./app/routes/productobolsa.routes.js")(app);
require("./app/routes/usuario.routes.js")(app);
require("./app/routes/proveedor.routes.js")(app);
require("./app/routes/productorelojes.routes.js")(app);
require("./app/routes/productocollares.routes.js")(app);
require("./app/routes/productomochilas.routes.js")(app);
require("./app/routes/productocarteras.routes.js")(app);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`El servidor se está ejecutando en el puerto ${PORT}.`);
});
