// 1) Recuperar el parametro id de la url
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
// 2) Recuperar los nodos con jQuery de mi HTML
const $name = $('input[name="name"]');
const $lastName = $('input[name="lastName"]');
const $phone = $('input[name="phone"]');
const $email = $('input[name="email"]');


// 3) Le pido al servidor la info del usuario con ese id
$.ajax(`/api/users/${id}`).done(function(user) {
    $name.val(user.name);
    $lastName.val(user.lastName);
    $phone.val(user.phone);
    $email.val(user.email);
});

$('#btn-save').on('click', ()=>{
    const validatePhone = /^\d+$/;
    const validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const name = $('input[name="name"]').val();
    const lastName = $('input[name="lastName"]').val();
    const phone = $('input[name="phone"]').val();
    const email = $('input[name="email"]').val();
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

    let editedUser = {
        id: id,
        name: $name.val(),
        lastName: $lastName.val(),
        phone: $phone.val(),
        email: $email.val()
    }
    $.ajax(`/api/users/${id}`,{
        method: 'PUT',
        data: editedUser
    })
    .done(()=> {
        $('#modal').addClass('visible')
        $('#modal-text').text('El usuario ha sido modificado con éxito')
        $('#close-modal').click(()=>{
          $('#modal').removeClass('visible')
          location.href = '/users';
        })
    })
})