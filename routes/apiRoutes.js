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
RUTA PARA OBTENER LOS USARIOS GUARDADOS
EN EL JSON
------------------------------------------
------------------------------------------ */

router.get('/users', function(req, res, next) {


  const users = JSON.parse(fs.readFileSync('users.json'));
  
  let search = req.query.search;



  // chequea si search esta definido y su longitud
  if (search && search.length > 0){
      search = search.toLowerCase();
      
      let usersFiltrados = users.filter(function (user) {
      return user.nombre.indexOf(search) >= 0 ;

    });

    res.json(usersFiltrados);
    
   }


  else ( res.json(users));
});


router.get("/users/:id", (req, res) => {
  const users = JSON.parse(fs.readFileSync('users.json'));

  // 0) Recupero el parametro id
  const userId = parseInt(req.params.id);
  const user = users.find(user => user.id === userId);
  res.json(user);
});


router.put("/users/:id", (req, res) =>{
    const users = JSON.parse(fs.readFileSync('users.json'));
    const idUser = parseInt(req.params.id)
    const miUser = users.find(u => u.id === idUser)

    miUser.nombre = req.body.nombre || miUser.nombre;
    miUser.apellido = req.body.apellido || miUser.apellido;
    miUser.email = req.body.email || miUser.email;
    miUser.telefono = req.body.telefono || miUser.telefono;
   
   
    fs.writeFileSync('users.json', JSON.stringify(users));

    res.json(miUser)
   })

router.post('/users', function (req, res) {
const users = JSON.parse(fs.readFileSync('users.json'));
const newUser = req.body;

if (newUser.nombre.length > 30) {
  return res.status(400).end('Nombre muy largo');
}
if (newUser.apellido.length > 30) {
  return res.status(400).end('Apellido muy largo');
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
FILTRADO
------------------------------------------
------------------------------------------
 */

router.get('/users', function(req, res){
  
 /*  const contenidoDelArchivo = JSON.parse(fs.readFileSync('users.json'));
  let users = JSON.parse( contenidoDelArchivo );
  const search = req.query.search;



  // chequea si search esta definido y su longitud
  if (search && search.length > 0){
      search = search.toLowerCase();
      
        let usersFiltrados = users.filter(function (user) {
      return false
    });
res(usersFiltrados)
    res.json(usersFiltrados);
    
   }
    */
   res.json([]);

});


router.delete('/users/:id', function(req, res) {
  const users = JSON.parse(fs.readFileSync('users.json'));
  const userId = parseInt(req.params.id)
  //USO EL FILTERED USER PQ NO MODIFICA DIRECTAMENTE MI ARRAY
  const filteredUser = users.filter((user) => user.id !== userId )
  
  //const userId = parseInt(req.params.id);
 // users.splice(users.findIndex(user => user.id == userId), 1);
  
  fs.writeFileSync('users.json', JSON.stringify(filteredUser));


  res.json(filteredUser);
});

module.exports = router;
