const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios.js')

let usuario = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {
        if (!data.nombre) {
            return callback({
                error: true,
                mensaje: 'El nombre es necesario'
            })
        }
        var per = usuario.agregarPersona(client.id, data.nombre);
        callback(per);

        //---notificando al todos los usuarios que alguien se unio al chat 
        client.broadcast.emit('listaPersonal', per);
    })

    client.on('disconnect', () => {
        let userDelete = usuario.deletePersona(client.id);
        //---notificando a los demas usuarios
        var mensaje = {
            usuario: 'Administrador',
            mensaje: `${userDelete.nombre} abandono el Chat..`
        }
        client.broadcast.emit('crearMensaje', mensaje);
        client.broadcast.emit('listaPersonal', usuario.getPersonas());

    });


});