var express = require('express');
var router = express.Router();
var usuarios_fb=require('../models/user');
var publicaciones=require('../models/publicaciones');
var correos=require('../models/correos');
var enviarCorreo=require('../models/correosEnviados');
var FB = require("fb");
var lodash = require("lodash");


Object.prototype.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Algoritmos de revisión')
});
/*
 * post correo {para*, asunto*, mensaje, cabeceras, descripcion}
 */
router.get('/posts',function(req,response,next){
    publicaciones.getPosted(function(err,rows){
        if(err)
        {
            console.log(err);
            response.json({"success":false,"message":err});
        }
        else{
            lodash.forEach(rows, function (row) {

                console.log(row);

                FB.options({
                    appId: '400226926995567',
                    version: 'v2.8',
                    accessToken: '400226926995567|YHWTf3Fa3nPSHiBclQKNs1YBUYQ'
                });
                FB.api('/' + row.id_post +'/?fields=reactions.summary(1)', function (res) {
                    if (!res || res.error) {
                        console.log(!res ? 'error occurred' : res.error);
                    }else{
                        var post =  JSON.parse(JSON.stringify(lodash.filter(rows, { 'id_post': res.id } )))[0];

                        console.log(post);

                        if (res.reactions.summary.total_count != post.likes_count) {
                            var promo = 0;
                            if (post.codigo_promo != null && post.codigo_promo != '') {
                                promo = 40;
                            }
                            var likes = promo + res.reactions.summary.total_count;
                            if (likes >= post.likes) {
                                publicaciones.actualizarCulminacion({
                                    likes_count: res.reactions.summary.total_count,
                                    id_post: res.id
                                }, function (err) {
                                    if(err){
                                        console.log('error actualizando la culminacion de los likes');
                                        response.json({"success":false,"message":err});
                                    }else{
                                        usuarios_fb.getById(post.usuario_fb_id, function (err, usu) {
                                            if (err){
                                                console.log('error obteniendo el usuario');
                                                response.json({"success":false,"message":err});
                                            }else{
                                                // Enviar Correo De posible ganador
                                                correos.findById(2, function (err, correo) {
                                                    if (err) {
                                                        console.log('error obteniendo el correo');
                                                        response.json({"success":false,"message":err});
                                                    }
                                                    else {
                                                        var usuario = JSON.parse(JSON.stringify(usu))[0];
                                                        var email = JSON.parse(JSON.stringify(correo))[0];
                                                        if (email) {
                                                            var mensaje = 'hola '+ usuario.nombre_fb + ' has completado los likes de '+row.prod_nombre;
                                                            enviarCorreo.enviarcorreo(email, usuario, {id:row.producto, nombre:row.prod_nombre}, {mensaje:mensaje}, function(err,info){
                                                                if(err)
                                                                {
                                                                    console.log('error enviando el correo');
                                                                    response.json({"success":false,"message":err});
                                                                }
                                                                else {
                                                                    if (info.success){
                                                                        response.json({"success":true});
                                                                    }else{
                                                                        response.json({"success":false, "message":info.message});
                                                                    }
                                                                }
                                                            });
                                                        } else {
                                                            response.json({"success": false, "code": 2, "message": "Correo no encontrado"});
                                                        }
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });

                            }else{
                                publicaciones.actualizarLikes({
                                    likes_count: res.reactions.summary.total_count,
                                    id_post: res.id
                                });
                                response.json({"success":true});
                            }
                        }
                    }
                });
            });
        }
    });

});

module.exports = router;
