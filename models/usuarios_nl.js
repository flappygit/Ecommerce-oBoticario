var db=require('../dbconnection'); //reference of dbconnection.js
var utiles = require('../libs/utiles');

var usuarios={

    getAll:function(callback){

        return db.query("SELECT correo, nombre, creacion, validado FROM usuarios_fb",callback);

    },
    add:function(usuario,callback){
        var fechaAct = utiles.fechaAct();
        var codigo = utiles.generarCodigo();
        var validado = 0;
        return db.query("INSERT INTO `usuarios_nl` (correo, nombre, creacion, codigo, validado) VALUES (?,?,?,?,?)",[usuario.correo, usuario.nombre, fechaAct, codigo, validado],callback);
    },
};
module.exports=usuarios;