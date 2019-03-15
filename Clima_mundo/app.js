const argv = require('./config/yargs.js').argv;
const data = require('./data/data.js');


///https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=481513e4ab7a97d697abb97fc2dd6d1c

data.dataNasa(argv.direccion)
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
    })
    