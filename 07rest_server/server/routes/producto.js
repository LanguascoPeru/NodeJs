const express = require('express');
const _ = require('underscore');
/// objeto que contiene la informacion del model de la bd
const Producto = require('../model/producto.js');
const aut = require('../middleware/autentication.js');
const app = express();

app.get('/producto', aut.verifica_token  ,(req, res)=>{

    desde = req.query.desde || 0;
    hasta = req.query.hasta || 0;     
    desde = Number(desde);
    hasta = Number(hasta);

    Producto.find({})
    .skip(desde)
    .limit(hasta) 
    .populate('categoria')
    .populate('usuario')
    .exec((err, data_producto) => {
        if (err) {
            res.status(400).json({
                ok: false,
                mensaje: err
            });
        } else {
            Producto.count({ estado: 'true' }, (err, conteo) => {
                res.json({
                    ok: true,
                    producto: data_producto,
                    cantidad_reg: conteo
                })
            })
        }
    })

});

 
app.get('/producto/:id', aut.verifica_token  ,(req, res)=>{
    let id_prod= req.params.id;
   /* Producto.findById(id_prod, (err, produc_bd) => {
        if (err) {
            res.status(400).json({
                ok: false,
                mensaje: err
            });
        } else {
            res.json({
                ok: true,
                usuarios: produc_bd
            })
        }
    }) 
*/
  Producto.findOne({ usuario: id_prod}).
  populate('categoria').
  exec(function (err, produc_bd) {
    if (err) {
        res.status(400).json({
            ok: false,
            mensaje: err
        });
    } else {
        res.json({
            ok: true,
            producto: produc_bd
        })
    }
  });

});
 
 app.post('/producto',[aut.verifica_token], function(req, res) {

    let body = req.body;
    var product = new Producto({
        nombre: body.nombre,
        precioUni:  body.precioUni ,
        descripcion:  body.descripcion,
        disponible:  body.disponible,
        categoria:  body.categoria,
        usuario:  body.usuario
    })

    product.save((err, data_producto)=>{
        if (err) {
            res.status(400).json({
                ok: false,
                mensaje: err
            })
        } else {
            res.json({
                ok: true,
                producto: data_producto
            })
        }
    })

});

app.put('/producto/:id',[aut.verifica_token], function(req, res) {
    let cod = req.params.id;

    /// _pick = sirve para seleccionar solo aquellos campos que se desean actualizar....
    let body = _.pick(req.body, ['precioUni']);

    //-----Escluyendo campos al actualizar...
    ////----delete body.email;

    ///-- findByIdAndUpdate {new:true}, para que devuelva las entidades actualizadas, {runValidators :true} sirve para que al actualizar respete validaciones del Grabar
    Producto.findByIdAndUpdate(cod, body, { new: true }, (err, data) => {
        if (err) {
            res.status(400).json({
                ok: false,
                mensaje: err
            });
        } else {
            res.json({
                ok: true,
                producto: data
            });
        }
    });




})
/*
app.delete('producto/:id', aut.verifica_token  ,(req, res)=>{


});
*/
module.exports = app;