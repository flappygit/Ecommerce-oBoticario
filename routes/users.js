var express = require('express');
var router = express.Router();
var user=require('../models/user');


Object.prototype.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('API REST USUARIOS ECOMMERCE V. 1.0.0');
});



router.post('/ValidUserFacebook',function(req,res,next){
    user.validUser(req.body,function(err,rows){
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
                user.addUser(req.body,function(err,count){
                    if(err)
                    {
                        console.log(err);
                        res.json({"success":false,"message":err});
                    }else{

                        user.getById(count.insertId,function(err,rows2){
                            res.json({"success":true,"message":rows2,"repeat":false});
                        });
                    }
                });
            }

            else{
                res.json({"success":true,"message":rows,"repeat":true});
            }

        }
    });

});

module.exports = router;
