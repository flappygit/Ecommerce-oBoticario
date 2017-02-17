var express = require('express');
var router = express.Router();
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
    publicaciones.getAll(function (err, rows) {
        res.json(rows);
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

module.exports = router;
