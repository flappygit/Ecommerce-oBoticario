var db=require('../dbconnection'); //reference of dbconnection.js
var utiles = require('../libs/utiles');

var usuarios={

    getAll:function(callback){
        return db.query("SELECT correo, nombre, creacion, usuario, rol FROM usuarios",callback);
    },

    add:function(usuario,callback){
        var fechaAct = utiles.fechaAct();
        return db.query("INSERT INTO `usuarios` (correo, nombre, creacion, usuario, clave, rol) VALUES (?,?,?,?,?,?)",[usuario.correo, usuario.nombre, fechaAct, usuario.usuario, usuario.clave, usuario.rol],callback);
    },

    validar:function(usuario, callback){
        return db.query("SELECT id, rol, nombre, correo FROM usuarios WHERE usuario=? AND clave=? LIMIT 1", [usuario.usuario, usuario.clave],callback);
    },
};
module.exports=usuarios;