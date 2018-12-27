$('#form button').click(function () {
  const name = $('input[name="name"]').val();
  const lastName = $('input[name="lastname"]').val();
  const phone = $('input[name="phone"]').val();
  const email = $('input[name="email"]').val();

  const validatePhone = /^\d+$/;
  const validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // el texto cumple con la expresion regular, .test() retorna true

  if (validatePhone.test(phone) === false) {
    $('#modal').addClass('visible')
    $('#modal-text').text('El teléfono es obligatorio')
    $('#close-modal').click(()=>{
      $('#modal').removeClass('visible')
    })
    return;
    
  }

  if (validateEmail.test(email) === false) {
    $('#modal').addClass('visible')
    $('#modal-text').text('El email es inválido')
    $('#close-modal').click(()=>{
      $('#modal').removeClass('visible')
    })
    return;
  }

  let newUser = {
    name: name,
    lastName: lastName,
    email: email,
    phone: phone
  };

  $.ajax('http://localhost:3000/api/users', {
    method: 'POST',
    data: newUser
  })
  .done( () => {
    $('#modal').addClass('visible')
    $('#modal-text').text('El usuario ha sido creado con éxito')
    $('#close-modal').click(()=>{
      $('#modal').removeClass('visible')
      location.href = '/users';
    })
    
  })
  .fail( (err) =>{
    alert('salio mal');
    console.log('salio todo mal: ', err);
  })
});