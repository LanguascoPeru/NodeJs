var express = require('express')
var app = express()
var hbs = require('hbs');
// indicando el servidor express que esta carpeta contiene todo el proyecto
app.use(express.static(__dirname + '/public'));

//--express HBS---
// __dirname = indicar la ruta absoluta ..  hbs.registerPartial  =indicando el servidor express que esta carpeta contiene todo el proyecto
hbs.registerPartials(__dirname + '/views/parciales');

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('Home', {
        Nombre: 'Julio Cesar',
        anio: new Date().getFullYear()
    });
});

app.listen(3000, () => {
    console.log('escuchando el puerto 3000 servidor activado nodejs ');
})