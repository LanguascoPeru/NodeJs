var socket = io();

var searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('nombre')) {
    window.location = "index.html";
    throw new Error('El nombre es necesario');
}

socket.on('connect', function() {
    var obj_usuario = {
        nombre: searchParams.get('nombre')
    }

    socket.emit('entrarChat', obj_usuario, function(res) {
        console.log('usuarios conectados :' + JSON.stringify(res));
    })

});


socket.on('crearMensaje', (data) => {
    console.log('SERVIDOR :' + JSON.stringify(data));
})

socket.on('listaPersonal', (data) => {
    console.log('SERVIDOR :' + JSON.stringify(data));
})

socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});