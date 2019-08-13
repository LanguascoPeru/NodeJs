var socket = io();
var label = $('small');

socket.on('connect', function() {
    console.log('conectado al servidor escritorio');
})

socket.on('disconnect', function() {
    console.log('desconectado del servidor escritorio');
})

var searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) {
    window.location = "index.html";
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(res) {
        console.log(res)
        if (res === 'No hay tickets') {
            label.text('No hay tickets');
            alert(res);
            return;
        }
        label.text('Ticket ' + res.numero);
    })

})