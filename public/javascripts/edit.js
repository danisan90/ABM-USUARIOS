// 1) Recuperar el parametro id de la url
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
// 2) Recuperar los nodos con jQuery de mi HTML
const $nombre = $('input[name="nombre"]');
const $apellido = $('input[name="apellido"]');
const $telefono = $('input[name="telefono"]');
const $email = $('input[name="email"]');
// 3) Le pido al servidor la info del usuario con ese id
$.ajax(`/api/users/${id}`).done(function(user) {
    $nombre.val(user.nombre);
    $apellido.val(user.apellido);
    $telefono.val(user.telefono);
    $email.val(user.email);
});
$('#btn-edit').on('click',function() {
    //vamos a hacer un put, osea que edite algo SIEMPRE QUE EDITE VOY A TENER UN PUT
    // el ajax tiene que tomar el id del metodo que quiero editar
    const editedUser = {
        nombre: $nombre.val().toLowerCase(),
        apellido: $apellido.val().toLowerCase(),
        telefono: $telefono.val(),
        email: $email.val().toLowerCase()
    }
    $.ajax(`http://localhost:8080/api/users/${id}`, {
        //ahora le digo que metodo quiero hacer
        method: "PUT",
        data: editedUser
    })
    .done(function () {
        
        alert('Usuario editado')
        location.href = "/users"
    })
    
})
