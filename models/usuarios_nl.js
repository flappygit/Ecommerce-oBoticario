var db=require('../dbconnection'); //reference of dbconnection.js
var utiles = require('../libs/utiles');

var usuarios={

    getAll:function(callback){

        return db.query("SELECT * FROM usuarios_nl",callback);

    },
    add:function(usuario, codigo, callback){
        var fechaAct = utiles.fechaAct();
        var validado = 0;
        return db.query("INSERT INTO `usuarios_nl` (correo, nombre, creacion, codigo, validado) VALUES (?,?,?,?,?)",[usuario.correo, usuario.nombre, fechaAct, codigo, validado],callback);
    },
    findById:function(id,callback){
        return db.query("SELECT * FROM `usuarios_nl` WHERE id = ?", [id],callback);
    },
    findByCodigo:function(codigo,callback){
        return db.query("SELECT * FROM `usuarios_nl` WHERE BINARY codigo = ? AND validado = 0", [codigo],callback);
    },
    buscarCodigo:function(codigo,callback){

        console.log('buscando codigo = '+codigo);
        return db.query("SELECT * FROM `usuarios_nl` WHERE BINARY codigo = ?", [codigo],callback);
    },
    actualizarValidacion:function(id,callback){
        return db.query("UPDATE `usuarios_nl` SET validado=1 WHERE id=?", [id],callback);
    }
};
module.exports=usuarios;