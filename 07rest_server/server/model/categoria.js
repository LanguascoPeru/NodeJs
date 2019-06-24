const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CategoriaSchema  = new Schema({
    descripcion: {
        type: String,
        unique:true,
        required: [true, "El nombre de la categoria  es necesario"]
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
});

module.exports = mongoose.model('Categoria', CategoriaSchema);
 