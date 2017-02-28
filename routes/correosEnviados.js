'use strict';
var express = require('express');
var router = express.Router();
var correos=require('../models/correos');
var correosEnviados=require('../models/correosEnviados');
var usuariosNl=require('../models/usuarios_nl');
const nodemailer = require('nodemailer');
var utiles = require('../libs/utiles');


Object.prototype.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

/* GET users listing. */
router.get('/', function(req, res, next) {
    correosEnviados.getAll(function (err, rows) {
        res.json(rows);
    });
});
/*
 * post usuario {para*, asunto*, mensaje, cabeceras, descripcion}
 */
router.post('/add',function(req,res,next){
    correosEnviados.add(req.body,function(err,rows){
        if(err)
        {
            console.log(err);
            res.json({"success":false,"message":err});
        }
        else{

            res.json({"success":true,"message":rows});

        }
    });

});
/*
 * id del correo
 */
router.get('/get/:id',function(req,res,next){
    correosEnviados.findById(req.params.id,function(err,rows){
        if(err)
        {
            console.log(err);
            res.json({"success":false,"message":err});
        }
        else{
            var rowStringyfy=JSON.stringify(rows);
            var rows1=JSON.parse(rowStringyfy);
            var size= Object.size(rows1);
            if(size==0 || size==null ){
                res.json({"success":true,"code":0})
            }else{
                res.json({"success":true,"code":1, 'rows':rows})
            }
        }
    });

});


/**
 * req {correo:'id del correo a enviar', to:'correo del destinatario', clave:'clave para la transaccion'}
 */
router.post("/enviarcorreo", function(req, res){

    console.log(req.body);
    if (req.body.clave = '400226926995567') {
        correos.findById(req.body.correo, function (err, row) {
            if (err) {
                console.log(err);
                res.json({"success": false, "message": err});
            }
            else {
                var email = JSON.parse(JSON.stringify(row))[0];
                if (email) {
                    correosEnviados.enviarcorreo(email, req.body.usuario, null, null, function(err,info){
                        if(err)
                        {
                            res.json({"success":false,"message":err});
                        }
                        else {
                            if (info.success){
                                res.json({"success":true});
                            }else{
                                res.json({"success": false, "code": 2, "message": info});
                            }
                        }
                    })
                } else {
                    res.json({"success": false, "code": 2, "message": "Correo no encontrado"});
                }
            }
        });
    }

});


router.post("/enviarcorreonl", function(req, res){

    if (req.body.clave = '400226926995567') {
        correos.findById(req.body.correo, function (err, row) {
            if (err) {
                console.log(err);
                res.json({"success": false, "message": err});
            }
            else {
                usuariosNl.findById(req.body.nl, function (err, nl) {
                    if (err){
                        res.json({"success": false, "message": "usuario nl no encontrado"});
                    }else {
                        var usuNl = JSON.parse(JSON.stringify(nl))[0];
                        var email = JSON.parse(JSON.stringify(row))[0];
                        if (email) {
                            var mensaje = 'Hola <b>'+usuNl.nombre+'</b>, Gracias por registrarte, tu codigo es <br> <h2>'+usuNl.codigo+'</h2> canjealo y obtendras 40 likes de regalo'
                            correosEnviados.enviarcorreo(email, req.body.usuario, null, {mensaje:mensaje}, function (err, info) {
                                if (err) {
                                    res.json({"success": false, "message": err});
                                }
                                else {
                                    if (info.success) {
                                        res.json({"success": true});
                                    } else {
                                        res.json({"success": false, "code": 2, "message": info});
                                    }
                                }
                            })
                        } else {
                            res.json({"success": false, "code": 2, "message": "Correo no encontrado"});
                        }
                    }
                });

            }
        });
    }

});

module.exports = router;
