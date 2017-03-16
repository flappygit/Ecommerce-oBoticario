var db=require('../dbconnection'); //reference of dbconnection.js
var utiles = require('../libs/utiles');

var publicaciones={

    getAll:function(callback){
        return db.query("SELECT p.*, fb.nombre_fb as nombre_fb, fb.correo as correo_fb, t.nombre as nombre_pr, t.likes as likes_pr " +
            "FROM publicaciones as p, usuarios_fb as fb, productos as t WHERE p.usuario_fb_id = fb.id AND p.producto_id = t.id ORDER BY p.likes_count Desc, p.creacion",callback);
    },

    getCulminados:function(callback){
        return db.query("SELECT p.*, fb.nombre_fb as nombre_fb, fb.correo as correo_fb, t.nombre as nombre_pr, t.likes as likes_pr " +
            "FROM publicaciones as p, usuarios_fb as fb, productos as t WHERE p.culminacion is not NULL AND p.validacion_fecha IS NULL AND p.usuario_fb_id = fb.id AND p.producto_id = t.id ORDER BY p.culminacion Asc",callback);
    },

    getValidado:function(callback){
        return db.query("SELECT p.*, fb.nombre_fb as nombre_fb, fb.correo as correo_fb, t.nombre as nombre_pr, t.likes as likes_pr " +
            "FROM publicaciones as p, usuarios_fb as fb, productos as t WHERE p.validacion_fecha IS NOT NULL AND p.usuario_fb_id = fb.id AND p.producto_id = t.id ORDER BY p.culminacion Asc",callback);
    },

    getPosted:function(callback){
        return db.query("SELECT p.id_post, p.codigo_promo, p.usuario_fb_id, p.likes_count, p.culminacion, pr.likes, pr.id as producto, pr.nombre as prod_nombre FROM publicaciones p, productos pr WHERE p.producto_id = pr.id AND p.id_post is not null AND p.id_post <> '' AND p.culminacion is null",callback);
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
    getPublicadoPorUsuario:function(id, callback){
        return db.query("SELECT p.id, p.creacion, p.codigo_promo, p.id_post, p.likes_count, p.culminacion, pr.id as producto, pr.referencia, pr.nombre, pr.precio, pr.likes, pr.titulo, pr.descripcion, pr.imagen, pr.cantidad " +
            "FROM `publicaciones` p, productos pr WHERE p.usuario_fb_id=? AND p.id_post <> '' AND pr.id = p.producto_id", [id],callback);
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
    actualizarProductoConPublicacion:function(publicacion, callback){
        var fechaAct = utiles.fechaAct();
        return db.query("UPDATE `publicaciones` SET id_post = ?, caption_title = ?, description = ?, publicacion = ?, messages_tags = ? WHERE `id` = ? ",
            [publicacion.id_post, publicacion.caption_title, publicacion.description, fechaAct, publicacion.messages_tags, publicacion.id ],callback);
    },
    actualizarLikes:function(publicacion, callback){
        return db.query("UPDATE `publicaciones` SET likes_count = ? WHERE `id_post` = ? OR id = ? ",
            [publicacion.likes_count, publicacion.id_post, publicacion.id ],callback);
    },
    actualizarCulminacion:function(publicacion, callback){
        var fechaHoraAct = utiles.fechaHoraAct();
        return db.query("UPDATE `publicaciones` SET likes_count = ?, culminacion = ? WHERE `id_post` = ? OR id = ? ",
            [publicacion.likes_count, fechaHoraAct, publicacion.id_post, publicacion.id ],callback);
    },
    getCulminado:function(id, callback){
        return db.query("SELECT p.*, fb.id as usuario, fb.nombre_fb as nombre_fb, fb.correo as correo, t.id as producto, t.nombre as nombre_pr, t.likes as likes_pr, t.descripcionKit as descripcionKit " +
            "FROM publicaciones as p, usuarios_fb as fb, productos as t WHERE p.id = ? AND p.culminacion is not NULL AND p.validacion_fecha IS NULL AND p.usuario_fb_id = fb.id AND p.producto_id = t.id", [id],callback);
    },
    getCodigoGanador:function(producto, callback){
        return db.query("SELECT * FROM codigos WHERE usuario_fb_id IS NULL AND producto_id = ? LIMIT 1", [producto],callback);
    },
    putCodigoGanador:function(id, usuario, callback){
        return db.query("UPDATE codigos SET usuario_fb_id = ? WHERE `id` = ?", [usuario, id],callback);
    },
    actualizarValidacion:function(id, estado, descripcion, codigo,callback){
        var fechaAct = utiles.fechaAct();
        return db.query("UPDATE `publicaciones` SET validacion_fecha = ?, validacion_estado = ?, validacion_descripcion = ?, codigo = ? WHERE id = ? ",
            [fechaAct, estado, descripcion, codigo, id],callback);
    }
};
module.exports=publicaciones;