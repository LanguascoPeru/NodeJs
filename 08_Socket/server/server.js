const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const path = require('path');

const app = express();

//----unimos el express con el http puro para ver las configuraciones del lado 
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

//--- comunicacion con el backend
let io = socketIO(server);

io.on('connection', (client) => {
    console.log('usuario conectado');
})



server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${port}`);
});