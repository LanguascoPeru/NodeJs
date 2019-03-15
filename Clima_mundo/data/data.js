const axios = require('axios');

let dataNasa = async(direccion) => {
    let res = await axios.get(direccion);
    return res.data;
}

module.exports = {
    dataNasa: dataNasa
}