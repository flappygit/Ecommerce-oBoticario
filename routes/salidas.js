var express = require('express');
var router = express.Router();
var salidas=require('../models/salidas');


Object.prototype.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

/* GET users listing. */
router.get('/', function(req, res, next) {
    salidas.getAll(function (err, rows) {
        res.json(rows);
    });
});
/*
 * post usuario {usuario*, clave*, rol*, nombre correo}
 */
router.get('/add',function(req,res,next){
    salidas.add({id_comprador:'id comprador', nombre_comprador:'nombre comprador', descripcion:'descripcion', usuario_id:1, publicacion_id:7},function(err,rows){
        if(err)
        {
            console.log(err);
            res.json({"success":false,"message":err});
        }
        else{

            res.json({"success":true,"message":'bn echo'});

        }
    });

});
/*
 * post usuario {usuario*, clave*}
 */
router.get('/get/:id',function(req,res,next){
    salidas.findById(req.params.id,function(err,rows){
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

module.exports = router;
