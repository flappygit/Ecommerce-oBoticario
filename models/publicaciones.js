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

    addCarrito:function(publicacion,callback){
        var fechaAct = utiles.fechaAct();
        var id_post = '';
        return db.query("INSERT INTO `publicaciones` (id_post, creacion, usuario_fb_id, producto_id) VALUES (?,?,?,?)",
            [id_post, fechaAct, publicacion.usuario_fb, publicacion.producto],callback);
    },

    verificarProducto:function(usuario, producto, callback){
        return db.query("SELECT * FROM `publicaciones` WHERE usuario_fb_id=? AND producto_id=?", [usuario, producto],callback);
    },

    findById:function(id, callback){
        return db.query("SELECT * FROM `publicaciones` WHERE id=?", [id],callback);
    },

    getUsuario:function(id, callback){
        return db.query("SELECT p.id, p.creacion, p.codigo_promo, pr.id as producto, pr.referencia, pr.nombre, pr.precio, pr.likes, pr.titulo, pr.descripcion, pr.imagen, pr.cantidad " +
            "FROM `publicaciones` p, productos pr WHERE p.usuario_fb_id=? AND p.id_post = '' AND pr.id = p.producto_id", [id],callback);
    },

    delete:function(id, callback){
        return db.query("DELETE FROM `publicaciones` WHERE id=?", [id],callback);
    },

    validarCodigo:function(usuario, callback){
        return db.query("SELECT COUNT(id) as num FROM `publicaciones` WHERE `usuario_fb_id`=? AND `codigo_promo` IS NOT NULL", [usuario],callback);
    },

    guardarCodigo:function(usuario, publicacion, codigo, callback){
        return db.query("UPDATE `publicaciones` SET codigo_promo = ? WHERE `usuario_fb_id`=? AND `id` = ?", [codigo, usuario, publicacion],callback);
    },
};
module.exports=publicaciones;