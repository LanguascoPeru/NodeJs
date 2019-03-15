const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'direccion de la cuidad a obtener el clima',
        demand: true
    }
}).argv;

module.exports = {
    argv: argv
}

