const {io} = require('../server')
io.on('connection', (client) => {
    console.log('usuario conectado');

     //----emit enviar mensaje al cliente --> {se envia un objeto} 
    client.emit('enviarMensaje', {
      usuario:'Administrador',
      mensaje:'Bienvenido a la aplicación'
    });
    
    //----on escuchar sucesos---
    client.on('disconnect',()=>{
        console.log('usuario desconectado');
    })

    //----on escuchar sucesos del cliente--> se recibe una function
    client.on('enviarMensaje',(data,callback)=>{
        console.log(data);
        
        //---devuelve el mensaje a todo el mundo conectado a nuestra aplicacion....
        client.broadcast.emit('enviarMensaje',data);

        /*
        if (mensaje.usuario){
            callback({
                resp: 'TODO SALIO BIEN..'
            });
        }else{
            callback({
                resp: 'TODO SALIO MALLL..'
            });
        }  
        */     
    })
})