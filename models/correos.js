var db=require('../dbconnection'); //reference of dbconnection.js
var utiles = require('../libs/utiles');

var correo={

    getAll:function(callback){
        return db.query("SELECT id, para, asunto, mensaje, cabeceras, descripcion FROM correos",callback);
    },

    add:function(correo,callback){
        return db.query("INSERT INTO `correos` (para, asunto, mensaje, cabeceras, descripcion) VALUES (?,?,?,?,?)",
            [correo.para, correo.asunto, correo.mensaje, correo.cabeceras, correo.descripcion],callback);
    },

    findById:function(id, callback){
        return db.query("SELECT * FROM `correos` WHERE id=?", [id],callback);
    },
};
module.exports=correo;