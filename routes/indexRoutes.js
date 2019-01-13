var express = require('express');
var router = express.Router();
const path = require('path');

/* Atienda a la ruta /estaspensandolomismoqueyobananin y devuelva la frase claro que si bananon*/
router.get("/estaspensandolomismoqueyobananin", (req, res) =>{
  res.send('<p style="color: blue;">claro que si bananon</p>')
  
});

/*Al ingresar a la ruta /users/new renderice un formulario*/
router.get("/users/new", (req,res) => {
  res.sendFile(path.join(__dirname, "..", "public", "new.html"));

});

//Al ingresar a la ruta /users renderizar un listado con los
// datos que pedimos en la ruta anterior
router.get("/users", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public","users.html"));
});

//Cada elemento en la tabla puede editarse 
//Al hacer click en editar, se redireccionará a /users/edit?id=[ID_USUARIO],

router.get("/users/edit", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "edit.html"));
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("<h1>ABM USUARIOS</h1><p>Ingresá a la ruta http://localhost:8080/users</p>"
  
  );
});

module.exports = router;
