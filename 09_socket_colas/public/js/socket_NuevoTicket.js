var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('conectado al servidor');
})

socket.on('disconnect', function() {
    console.log('desconectado del servidor');
})

socket.on('enviarMensaje', function(data) {
    console.log(data);
})

socket.on('estadoActual', (data) => {
    label.text(data.actual);
});

$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    })
})