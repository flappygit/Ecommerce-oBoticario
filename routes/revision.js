var express = require('express');
var router = express.Router();
var usuarios_fb=require('../models/user');
var publicaciones=require('../models/publicaciones');
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
router.get('/posts',function(req,res,next){
    publicaciones.getPosted(function(err,rows){
        if(err)
        {
            console.log(err);
            res.json({"success":false,"message":err});
        }
        else{
            lodash.forEach(rows, function (row) {
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
                        if (res.reactions.summary.total_count > post.likes_count) {
                            var promo = 0;
                            if (post.codigo_promo != null && post.codigo_promo != '') {
                                promo = 40;
                            }
                            var likes = promo + res.reactions.summary.total_count;
                            if (likes >= post.likes) {
                                publicaciones.actualizarCulminacion({
                                    likes_count: res.reactions.summary.total_count,
                                    id_post: res.id
                                });
                                // Todo Enviar Correo De posible ganador
                            }else{
                                publicaciones.actualizarLikes({
                                    likes_count: res.reactions.summary.total_count,
                                    id_post: res.id
                                });
                            }
                        }
                    }
                });
            });


            res.send('terminó');
        }
    });

});

module.exports = router;
