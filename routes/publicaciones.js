var express = require('express');
var router = express.Router();
var publicaciones=require('../models/publicaciones');
var usuarios_nl=require('../models/usuarios_nl');
var usuarios_fb=require('../models/user');


Object.prototype.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

/* GET users listing. */
router.get('/', function(req, res, next) {
    publicaciones.getAll(function (err, rows) {
        res.json({"success":true,"message":rows});
    });
});

/* GET users listing. */
router.get('/culminados', function(req, res, next) {
    publicaciones.getCulminados(function (err, rows) {
        res.json({"success":true,"message":rows});
    });
});

/* GET users listing. */
router.get('/validados', function(req, res, next) {
    publicaciones.getValidado(function (err, rows) {
        res.json({"success":true,"message":rows});
    });
});
/*
 * post publicaciones {id_post, id_shared, caption_tittle, description, messages_tags, usuario_fb, producto}
 */
router.post('/add',function(req,res,next){
    publicaciones.add(req.body,function(err,rows){
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
 * post publicaciones {usuario_fb, producto}
 */
router.post('/addCarrito',function(req,res,next){
    publicaciones.verificarProducto(req.body.usuario_fb, req.body.producto, function (err, rows) {
        var rowStringyfy=JSON.stringify(rows);
        var rows1=JSON.parse(rowStringyfy);
        var size= Object.size(rows1);
        if(size!=null && size>0 ){
            res.json({"success":true,"message":rows, "existente":true});
        }else{
            publicaciones.addCarrito(req.body,function(err,rows){
                if(err)
                {
                    console.log(err);
                    res.json({"success":false,"message":err});
                }
                else{

                    res.json({"success":true,"message":rows, "existente":false});

                }
            });
        }
    });


});
/*
 *
 */
router.get('/get/:id',function(req,res,next){
    publicaciones.findById(req.params.id, function(err,rows){
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
 * Buscar las publicaciones de un usuario
 */
router.get('/getUsuario/:id',function(req,res,next){
    publicaciones.getUsuario(req.params.id, function(err,rows){
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
                res.json({"success":true,"code":false})
            }else{
                res.json({"success":true,"code":true, 'rows':rows})
            }
        }
    });

});
/**
 * Buscar las publicaciones de un usuario
 */
router.get('/getPublicadoPorUsuario/:id',function(req,res,next){
    publicaciones.getPublicadoPorUsuario(req.params.id, function(err,rows){
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
                res.json({"success":true,"code":false})
            }else{
                res.json({"success":true,"code":true, 'rows':rows})
            }
        }
    });

});
/**
 * Eliminar una publicación
 */
router.get('/eliminar/:id',function(req,res,next){
    publicaciones.delete(req.params.id, function(err,rows){
        if(err)
        {
            console.log(err);
            res.json({"success":false,"message":err});
        }
        else{

                res.json({"success":true})

        }
    });

});
/**
 * validar el codigo promo en la publicacion de un usuario
 */
router.post('/validarCodigo',function(req,res,next){
    usuarios_nl.findByCodigo(req.body.codigo, function(err,rows){
        if(err)
        {
            console.log(err);
            res.json({"success":false,"message":err});
        }
        else{
            var rowStringyfy=JSON.stringify(rows);
            var usuario_fb=JSON.parse(rowStringyfy);
            var size= Object.size(usuario_fb);
            if(size==0 || size==null ){
                res.json({"success":true,"code":false})
            }else{
                publicaciones.validarCodigo(req.body.usuario, function (err, row) {
                    if (err){
                        console.error('error en la validacion de las publicaciones');
                        res.json({"success":false,"message":err});
                    }else {
                        var rowStringyfy=JSON.stringify(row);
                        var cant=JSON.parse(rowStringyfy);
                        if(cant[0].num > 0){
                            res.json({"success":true,"code":false});
                        }else{
                            usuarios_fb.importarNl({id:req.body.usuario, nombre:usuario_fb[0].nombre, correo:usuario_fb[0].correo}, function (err, row) {
                                if (err){
                                    console.error('error en la actualizacion del usuario');
                                    res.json({"success":false,"message":err});
                                }else {
                                    usuarios_nl.actualizarValidacion(usuario_fb[0].id, function (err, row) {
                                        if (err){
                                            console.error('error en la actualizacion de los usuariosNl');
                                            res.json({"success":false,"message":err});
                                        }else {
                                            publicaciones.guardarCodigo(req.body.usuario, req.body.producto, req.body.codigo, function (err, row) {
                                                if (err){
                                                    console.error('error en la actualizacion de la publicacion');
                                                    res.json({"success":false,"message":err});
                                                }else {
                                                    res.json({"success":true,"code":true});
                                                }
                                            });
                                        }
                                    });
                                }
                            })
                        }
                    }
                });
            }
        }
    });

});
/*
 * req publicacion [id_post, caption_title, description, messages_tags, id]
 */
router.post('/productoPublicado',function(req,res,next){
    publicaciones.actualizarProductoConPublicacion(req.body, function(err,rows){
        if(err)
        {
            console.log(err);
            res.json({"success":false,"message":err});
        }
        else{
            res.json({"success":true, 'rows':rows})
        }
    });

});
/*
 * req publicacion [likes_count, id_post, id]
 */
router.post('/actualizarLikes',function(req,res,next){
    publicaciones.actualizarLikes(req.body, function(err,rows){
        if(err)
        {
            console.log(err);
            res.json({"success":false,"message":err});
        }
        else{
            res.json({"success":true, 'rows':rows})
        }
    });

});

module.exports = router;
