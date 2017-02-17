var db=require('../dbconnection'); //reference of dbconnection.js
var utiles = require('../libs/utiles');

var productos={

    getAll:function(callback){
        return db.query("SELECT * FROM productos",callback);
    },

    add:function(producto,callback){
        var fechaAct = utiles.fechaAct();
        return db.query("INSERT INTO `productos` (referencia, nombre, creacion, precio, likes, titulo, descripcion, imagen, cantidad) VALUES (?,?,?,?,?,?,?,?,?)",
            [producto.referencia, producto.nombre, fechaAct, producto.precio, producto.likes, producto.titulo, producto.descripcion, producto.imagen, producto.cantidad],callback);
    },

    findById:function(id, callback){
        return db.query("SELECT * FROM `productos` WHERE id=?", [id],callback);
    },
};
module.exports=productos;