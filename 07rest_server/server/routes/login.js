const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const jwt = require('jsonwebtoken');

/// objeto que contiene la informacion del model de la bd
const Usuario = require('../model/usuario.js')

const app = express();

app.post('/login', function(req, res) {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, data_usuario) => {
        if (err) {
            res.status(400).json({
                ok: false,
                message: err
            });
        } else {
            if (data_usuario === null) {
                res.json({
                    ok: false,
                    message: 'No se encontro informacion con el correo ingresado'
                })
            } else {

                // tenemos que consultar la constraseña
                // bcrypt.compareSync  = compara la contraseña que se envia con la que esta en la bd, antes de compar la 
                // contra que envia el usuario la encripta para luego recien compararla

                if (bcrypt.compareSync(body.password, data_usuario.password)) {
                    //----- pick sierve para definir aquellos campos que queremos devolver;
                    //let data_user_encontro = _.pick(data_usuario, ['nombre']);

                    /// funcion encargada de generar el codigo token  
                    let token_Porservidor = jwt.sign({
                        usuario: data_usuario
                    }, 'este-es-el-sed-desarrollo', { expiresIn: 60 * 60 });


                    res.json({
                        ok: true,
                        message: data_usuario,
                        token: token_Porservidor
                    })
                } else {
                    res.json({
                        ok: false,
                        message: 'contraseña equivocada'
                    })
                }
            }



        }
    })

})


module.exports = app;