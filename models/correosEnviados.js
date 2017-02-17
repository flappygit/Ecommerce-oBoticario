var db=require('../dbconnection'); //reference of dbconnection.js
var utiles = require('../libs/utiles');

var correoEnviado={

    getAll:function(callback){
        return db.query("SELECT c.*, m.id as correo, m.asunto FROM correos m, correos_enviados c WHERE m.id = c.correo_id",callback);
    },

    add:function(correo,callback){
        var fechaAct = utiles.fechaAct();
        return db.query("INSERT INTO `correos_enviados` (fecha, descripcion, correo_id, publicacion_id, usuario_fb_id, usuario_nl_id) VALUES (?,?,?,?,?,?)",
            [fechaAct, correo.descripcion, correo.correo_id, correo.publicacion_id, correo.usuario_fb_id, correo.usuario_nl_id],callback);
    },

    findById:function(id, callback){
        return db.query("SELECT * FROM `correos_enviados` WHERE id=?", [id],callback);
    },
};
module.exports=correoEnviado;