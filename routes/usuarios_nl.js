var express = require('express');
var router = express.Router();
var usuarios=require('../models/usuarios_nl');


Object.prototype.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Usuarios newsletter');
});


/*
 * post usuario {correo*, nombre}
 */
router.post('/add',function(req,res,next){
    usuarios.add(req.body,function(err,rows){
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

module.exports = router;
