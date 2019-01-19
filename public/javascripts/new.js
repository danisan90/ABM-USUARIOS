$('.save-button').click(function () {
    const nombre = $('input[name="nombre"]').val().toLowerCase();
    const apellido = $('input[name="apellido"]').val().toLowerCase();
    const telefono = $('input[name="telefono"]').val();
    const email = $('input[name="email"]').val().toLowerCase();
  

    const validarNombre = /^[a-z]{1,30}$/;
    const validarNumero = /^\d+$/;
    const validarEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    
      if (validarNombre.test(nombre) === false) {
        alert('El nombre es muy largo!!');
        return;
      }
    
    
    // el texto cumple con la expresion regular, .test() retorna true
    if (validarNumero.test(telefono) === false) {
      alert('El telefono no es valido');
      return;
    }
  
    if (validarEmail.test(email) === false) {
      alert('Email no valido, por favor intente de nuevo');
      return;
    }
  
    let elNuevoUsuario = {
      nombre: nombre,
      apellido: apellido,
      email: email,
      telefono: telefono
    };
  
    $.ajax('http://localhost:8080/api/users', {
      method: 'POST',
      data: elNuevoUsuario
    })
    .done(function () {
      alert('usuario creado!');
      location.href = '/users';
    })
    .fail(function (err) {
      alert('Algo salio mal al crear el usuario');
      console.log('salio todo mal: ', err);
    })
  });