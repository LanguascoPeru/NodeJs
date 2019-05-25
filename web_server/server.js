var express = require('express')
var app = express()
var hbs = require('hbs');

var port = process.env.PORT || 3000;    

// indicando el servidor express que esta carpeta contiene todo el proyecto
app.use(express.static(__dirname + '/public'));

//--express HBS---
// __dirname = indicar la ruta absoluta ..  hbs.registerPartial  =indicando el servidor express que esta carpeta contiene todo el proyecto
hbs.registerPartials(__dirname + '/views/parciales');

app.set('view engine', 'hbs');

/// helpers ---- funciones globales que se pueden ver en cualquier vista

hbs.registerHelper('getAnio',()=>{
    return  new Date().getFullYear();
})


//---Nombre,Anio son variables
app.get('/', (req, res) => {
    res.render('Home', {
        Nombre: 'Julio Cesar',
    });
});
app.get('/About', (req, res) => {
    res.render('About', {});
});

app.listen(port, () => {
    console.log('escuchando el puerto ' + port + ' servidor activado nodejs ');
})