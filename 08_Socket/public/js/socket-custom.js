var socket = io();         
//----on escuchar sucesos---
socket.on('connect', function() {
    console.log('conectado al servidor');
})
//2 ---on escuchar sucesos---
socket.on('disconnect', function() {
    console.log('Perdimos conexion con el servidor');
})

//3 ---emetir-- enviar informacion al servidor          socket.emit('<nombre del evento>',{tu mensaje en objeto})
socket.emit('enviarMensaje',{
    usuario: 'Julio cesar',
    mensaje: 'Hola mundo'
}, function(resp){
    console.log('respuesta server :' + JSON.stringify(resp));
});
//---- escuchar informacion del servidor, se recibe un funcion
socket.on('enviarMensaje', function(mensaje_server){
    console.log('servidor : ' + JSON.stringify(mensaje_server));
});