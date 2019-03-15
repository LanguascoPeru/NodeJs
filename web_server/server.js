var express = require('express')
var app = express()

app.use(express.static(__dirname + '/public'))

//--express HBS---
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