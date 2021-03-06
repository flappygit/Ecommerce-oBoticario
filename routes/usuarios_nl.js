var express = require('express');
var router = express.Router();
var usuarios=require('../models/usuarios_nl');
var crypto = require('crypto');
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
    usuarios.getAll(function (err, rows) {
        res.json({"success":true,"message":rows});
    });
});


/*
 * post usuario {correo*, nombre}
 */
router.post('/add',function(req,res,next){

    var codigo = utiles.codigoAleatorio(6);
    buscarCodigo(codigo);
    function buscarCodigo(codigo) {
        usuarios.buscarCodigo(codigo, function (err, rows) {
            var rowStringyfy = JSON.stringify(rows);
            var rows1 = JSON.parse(rowStringyfy);
            var size = Object.size(rows1);
            if (size == 0 || size == null) {
                usuarios.add(req.body, codigo, function (err, rows) {
                    if (err) {
                        console.log(err);
                        res.json({"success": false, "message": err});
                    }
                    else {
                        res.json({"success": true, "message": rows});

                    }
                });
            }else{
                codigo = utiles.codigoAleatorio(6);
                buscarCodigo(codigo);
            }
        });
    }

});


/*
 * Verificar codigo {correo*}
 */
router.get('/verificarCodigo/:correo/:codigo',function(req,res,next){
    var hash = utiles.generarCodigo(req.params.correo);
    if (hash === req.params.codigo){
        res.send("Codigo correcto");
    }else{
        res.send("Codigo NO valido");
    }
});

module.exports = router;
