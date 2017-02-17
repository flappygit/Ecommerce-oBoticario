var db=require('../dbconnection'); //reference of dbconnection.js
var utiles = require('../libs/utiles');

var publicaciones={

    getAll:function(callback){
        return db.query("SELECT * FROM publicaciones",callback);
    },

    add:function(publicacion,callback){
        var fechaAct = utiles.fechaAct();
        return db.query("INSERT INTO `publicaciones` (id_post, creacion, id_shared, caption_title, description, messages_tags, usuario_fb_id, producto_id) VALUES (?,?,?,?,?,?,?,?)",
            [publicacion.id_post, fechaAct, publicacion.id_shared, publicacion.caption_tittle, publicacion.description, publicacion.messages_tags, publicacion.usuario_fb, publicacion.producto],callback);
    },

    findById:function(id, callback){
        return db.query("SELECT * FROM `publicaciones` WHERE id=?", [id],callback);
    },
};
module.exports=publicaciones;