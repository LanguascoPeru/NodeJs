const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control.js');

const ticketControl = new TicketControl();

var obj_mensajes = [];
obj_mensajes = [{
    usuario: 'Administrador',
    mensaje: 'Bienvenido a la aplicación'
}]

io.on('connection', (client) => {
    ///// (data =objecto que envia cliente parametros , callback) 
    client.on('siguienteTicket', (data, callback) => {
        let next = ticketControl.siguienteTicket();
        callback(next);
    });

    let ultimo = ticketControl.ultimoTicket();
    let ultimo4 = ticketControl.ultimosss4();

    client.emit('estadoActual', {
        actual: ultimo,
        ultimos4: ultimo4
    });



    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            callback({
                error: true,
                mensaje: 'El escritorio es necesario'
            })
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);
        client.broadcast.emit('ultimos4', { ultimos4: ultimo4 })

    });



});