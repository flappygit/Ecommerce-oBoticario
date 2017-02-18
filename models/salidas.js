var db=require('../dbconnection'); //reference of dbconnection.js
var utiles = require('../libs/utiles');

var salida={

    getAll:function(callback){
        return db.query("SELECT * FROM salidas",callback);
    },

    add:function(salida,callback){
        var fechaAct = utiles.fechaAct();
        return db.query("INSERT INTO `salidas` (creacion, id_comprador, nombre_comprador, descripcion, usuario_id, publicacion_id) VALUES (?,?,?,?,?,?)",
            [fechaAct, salida.id_comprador, salida.nombre_comprador, salida.descripcion, salida.usuario_id, salida.publicacion_id],callback);
    },

    findById:function(id, callback){
        return db.query("SELECT * FROM `salidas` WHERE id=?", [id],callback);
    },
};
module.exports=salida;