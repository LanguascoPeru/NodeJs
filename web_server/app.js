const http = require('http');

http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        let salida = {
            nombre: 'julio cesar',
            edad: 32,
            url: req.url
        }
        res.write(JSON.stringify(salida));
        res.end();
        // res.write('hola mundo');
        // res.end();
    })
    .listen(8080);

console.log('escuchando el puerto 8080 servidor activado nodejs cuando ');