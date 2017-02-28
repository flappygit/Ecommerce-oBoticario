var db=require('../dbconnection'); //reference of dbconnection.js
var utiles = require('../libs/utiles');
var nodemailer = require("nodemailer");

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
    enviarcorreo:function(email, usuario, producto, extra, callback){

        var correo = usuario.correo;
        if (correo == null || correo == ''){
            correo = usuario.correo_fb;
            if (correo == null || correo == ''){
                correo = 'marcela.ramirez@nabica.com.co';
                extra.mensaje = 'El usuario '+usuario.id +' ha terminado los likes para el producto '+ producto.nombre +' pero no tiene correo de contacto';
            }
        }
        if (/(.+)@(.+){2,}\.(.+){2,}/.test(usuario.correo)) {

            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, // upgrade later with STARTTLS
                auth: {
                    user: 'boticarioecommerce@gmail.com',
                    pass: 'boti12ecommerce34'
                }
            });
            if (extra != null && extra.mensaje && extra.mensaje!=null){
                mensaje = extra.mensaje;
            }

            var opciones = {
                from: email.para, // NOTA: Para es quien lo envia XD
                to: correo+',marcela.ramirez@nabica.com.co',//req.body.nombre+' <'+ req.body.to +'>', // Para quem o e-mail deve chegar
                subject: email.asunto, // O assunto
                html: mensaje // O HTMl do nosso e-mail
            };
            console.log(opciones);
            transporter.sendMail(opciones, function (error, info) {
                if (error) {
                    console.log(error);
                    JSON.stringify({"success": false, "code": 1, "message": error.message}, callback);
                } else {

                     var fechaAct = utiles.fechaAct();
                     db.query("INSERT INTO `correos_enviados` (fecha, descripcion,correo_id, publicacion_id, usuario_fb_id) VALUES (?,?,?,?,?)",
                        [fechaAct, usuario.nombre+' gano '+producto.nombre,email.id, email.publicacion_id, usuario.id]);
                     return JSON.stringify({"success": true}, callback);

                }
            });

            //return JSON.stringify({"success": true}, callback);
        } else {
            return JSON.stringify({"success": false, "code": 1, "message": "El email no es válido"}, callback);
        }
    }
};
module.exports=correoEnviado;