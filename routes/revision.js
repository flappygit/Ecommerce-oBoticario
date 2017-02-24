var express = require('express');
var router = express.Router();
var usuarios_fb=require('../models/user');
var publicaciones=require('../models/publicaciones');


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
            res.json({"success":true,"message":rows});
        }
    });

});

module.exports = router;
