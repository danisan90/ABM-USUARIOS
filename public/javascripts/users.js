const $tableUsers = $("#table-users");
$.ajax("/api/users").done(function(data) {
    buildTableUsers(data);
});

/* ----------------------------------------------
-------------------------------------------------
CONSTRUCCION DE TABLA DE USUARIOS
----------------------------------------------
-------------------------------------------------*/


function buildTableUsers(users) {
    for (let i = 0; i < users.length; i++) {
        $tableUsers.append(`
        <tr class="user-row" data-id=${users[i].id}>
            <td>${users[i].nombre}</td>
            <td>${users[i].apellido}</td>
            <td>${users[i].telefono}</td>
            <td>${users[i].email}</td>
            <td><a class="button is-link is-outlined is-small btn edit" id="edit">Editar</a></td>
            <td><button class="btn delete">Borrar</button></td>
            
        </tr>
       `);
    }
}


/* ----------------------------------------------
-------------------------------------------------
Boton para editar el usuario del formulario
redirige a una pantalla de edicion 
----------------------------------------------
-------------------------------------------------*/
$(document).on("click", ".btn#edit", function() {
    // Recupero el id que tiene la row
    // Tengo que hacer .parent().parent() porque el button esta dentro de un span
    // Su primer parent es el span
    // Su segundo parent es la row
    const id = $(this)
        .parent()
        .parent()
        .data("id");
    
    location.href = `/users/edit?id=${id}`;
});

/* ----------------------------------------------
-------------------------------------------------
BOTON PARA BORRAR USUARIO
----------------------------------------------
-------------------------------------------------*/

$(document).on("click", ".btn.delete", function() {
    
    const id = $(this)
        .parent()
        .parent()
        .data("id");
    $(this)
        .parent()
        .parent()
        .remove();

    $.ajax(`/api/users/${id}`, {
        method: "delete"
    })
    .done(function () {
        $(this).parent().remove();
        alert('Usuario Borrado!');
        location.href = '/users';
      })
      
    .fail(function (err) {
        alert('Algo salio mal');
        
      })
});
/* -------------------------------------
-------------------------------------
FILTRADO 
-------------------------------------
------------------------------------- */

$('#filter-form .button').click(function(){
    console.log("filtrando");
    const palabraDeBusqueda = $('#filter-form input').val();
    console.log(palabraDeBusqueda)
    $('#all div').remove(); 

   /*   search in api */
  
 $.ajax('http://localhost:8080/api/users?search=' + palabraDeBusqueda)  
    .done(function(data){
        console.log(data)
       
            
            
           /*  console.log(buildTableUsers(data)) */
           $('.user-row').remove();
           buildTableUsers(data);
    })
})
