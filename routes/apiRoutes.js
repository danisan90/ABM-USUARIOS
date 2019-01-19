const express = require('express');
const router = express.Router();
const fs = require('fs');
var generator = require('node-uuid-generator');
/* GET users listing. */
router.get('/', function(req, res, next) {
res.send('respond with a resource');
});

/* ------------------------------------------
------------------------------------------
FILTRADO
------------------------------------------
------------------------------------------ */

router.get('/users', function(req, res, next) {

const users = JSON.parse(fs.readFileSync('users.json'));

//INICIO FILTER
let search = req.query.search;

// chequea si search esta definido y su longitud
if (search && search.length > 0){
    search = search.toLowerCase();
    
    let usersFiltrados = users.filter(function (user) {
    return user.nombre.indexOf(search) >= 0 
            || user.apellido.indexOf(search) >= 0
            || user.telefono.indexOf(search) >= 0 
            || user.email.indexOf(search) >= 0;

  });

  res.json(usersFiltrados);
  }


else ( res.json(users));
});

/* ------------------------------------------
------------------------------------------
RECUPERO ID USUARIO
------------------------------------------
------------------------------------------ */
router.get("/users/:id", (req, res) => {
const users = JSON.parse(fs.readFileSync('users.json'));


const userId = (req.params.id);
const user = users.find(user => user.id === userId);
res.json(user);

});

/* ------------------------------------------
------------------------------------------
EDICION DE USUARIO
------------------------------------------
------------------------------------------ */
router.put("/users/:id", (req, res) =>{
    const users = JSON.parse(fs.readFileSync('users.json'));
    const idUser = req.params.id
    const miUser = users.find(u => u.id === idUser)

    miUser.nombre = req.body.nombre || miUser.nombre;
    miUser.apellido = req.body.apellido || miUser.apellido;
    miUser.email = req.body.email || miUser.email;
    miUser.telefono = req.body.telefono || miUser.telefono;
   
   
    fs.writeFileSync('users.json', JSON.stringify(users));

    res.json(miUser)
   })
/* ------------------------------------------
------------------------------------------
FUNCION PARA VALIDAR DEL LADO DEL SERVIDOR
------------------------------------------
------------------------------------------ */

function validationInputs(user){
  const validarNombre = /^[a-z]{1,30}$/;
  const validarApellido = /^[a-z]{1,30}$/;
  const validarNumero = /^\d+$/;
  const validarEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(user.nombre.length > 30 || !validarNombre.test(user.nombre)){
    return false;
  }
  if(user.apellido.length > 30 || !validarApellido.test(user.apellido)){
    return false;
  }
  if(user.telefono.length > 30 || !validarNumero.test(user.telefono)){
    return false;
  }
  if(!validarEmail.test(user.email)){
    return false;
  }
}


router.post('/users', function (req, res,) {
const users = JSON.parse(fs.readFileSync('users.json'));
const newUser = req.body;

/*   return res.status(400).end('Valores no aceptados, lee bien!')
 */  
  const validarNombre = /^[a-z]{1,30}$/;
  const validarApellido = /^[a-z]{1,30}$/;
  const validarNumero = /^\d+$/;
  const validarEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(newUser.nombre.length > 30 || !validarNombre.test(newUser.nombre)){
    return res.status(400).end('El Nombre no cumple las condiciones');
  }
  if(newUser.apellido.length > 30 || !validarApellido.test(newUser.apellido)){
    return res.status(400).end('El Apellido no cumple las condiciones');
  }
  if(newUser.telefono.length > 30 || !validarNumero.test(newUser.telefono)){
    return  res.status(400).end('El Telefono no cumple las condiciones');
  }
  if(!validarEmail.test(newUser.email)){
    return res.status(400).end('El mail no cumple las condiciones');
  }


newUser.id =generator.generate();


// agrego el usuario al array global
users.push(newUser);
fs.writeFileSync('users.json', JSON.stringify(users));

// le respondemos con el array de objetos
res.json(newUser);

});

/* ------------------------------------------
------------------------------------------
BORRADO DE USUARIOS
------------------------------------------
------------------------------------------
 */
router.delete('/users/:id', function(req, res) {
  const users = JSON.parse(fs.readFileSync('users.json'));
  const userId = req.params.id

  //USO EL FILTERED USER PQ NO MODIFICA DIRECTAMENTE MI ARRAY
  const filteredUser = users.filter((user) => user.id !== userId )
  
  //const userId = parseInt(req.params.id);
 // users.splice(users.findIndex(user => user.id == userId), 1);
  
  fs.writeFileSync('users.json', JSON.stringify(filteredUser));


  res.json(filteredUser);
});

module.exports = router;
