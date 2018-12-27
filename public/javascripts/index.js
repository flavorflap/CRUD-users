const $usersTable = $("#users-table");
$.ajax("/api/users").done(function(data) {
    renderTable(data);
});

function renderTable(users) {
    for (let i = 0; i < users.length; i++) {
        $usersTable.append(`
        <tr class='user-row' data-id=${users[i].id}>
            <td>${users[i].name}</td>
            <td>${users[i].lastName}</td>
            <td>${users[i].phone}</td>
            <td>${users[i].email}</td>
            <td><button class="btn edit">Editar</button></td>
            <td><button class="btn delete" >Borrar</button></td>
        </tr>
    `);
    }
}

$(document).on("click", ".btn.edit", function() {
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

$(document).on("click", ".btn.delete", function() {
    const id = $(this)
        .parent()
        .parent()
        .data("id");

    $.ajax(`/api/users/${id}`, {
        method: "DELETE"
    })
    .done(() => {
        $(this)
        .parent()
        .parent()
        .remove();
    })
    .fail(()=>{
        alert('no se pudo borrar el usuario')
    });
});

$('#search-container button').click(function(){
    const search =  $('#search-container input').val();

    $.ajax('/api/users?search='+ search)
    .done (function (data){
        $('.user-row').remove();
        renderTable(data);
    })
});

$('#clear-filter').click(()=>{
    $.ajax('/api/users')
    .done(function(data){
        $('.user-row').remove();
        $('#search-container input').val('');
        renderTable(data);
    })
})