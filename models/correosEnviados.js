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
                correo = 'boticarioecommerce@gmail.com';
                extra.mensaje = 'El usuario '+usuario.id +'-'+usuario.nombre_fb+' no tiene correo para contactar';
                console.log('no hay correos');
            }
        }
        if (/(.+)@(.+){2,}\.(.+){2,}/.test(correo)) {

            var transporter = nodemailer.createTransport({
                host: 'creeenlabelleza.com',
                port: 587,
                secure: false, // upgrade later with STARTTLS
                auth: {
                    user: 'noreply@creeenlabelleza.com',
                    pass: 'Nabica2017boti20'
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            var mensaje = email.mensaje;
            if (extra != null && extra.mensaje && extra.mensaje!=null){
                mensaje = extra.mensaje;
            }

            var opciones = {
                from: email.para, // NOTA: Para es quien lo envia XD
                to: correo+',boticarioecommerce@gmail.com',//req.body.nombre+' <'+ req.body.to +'>', // Para quem o e-mail deve chegar
                subject: email.asunto, // O assunto
                html: mensaje // O HTMl do nosso e-mail
            };
            transporter.sendMail(opciones, function (error, info) {
                if (error) {
                    console.log(error);
                    JSON.stringify({"success": false, "code": 1, "message": error.message}, callback);
                } else {

                    var fechaAct = utiles.fechaAct();
                    if (email.id == 1 ){

                        db.query("INSERT INTO `correos_enviados` (fecha, descripcion,correo_id, usuario_nl_id) VALUES (?,?,?,?)",
                            [fechaAct, usuario.nombre,email.id, usuario.id],function(err,rows){
                                if(err){
                                    console.log('error '+err);
                                }
                            });
                    }else if (email.id == 2){
                        db.query("INSERT INTO `correos_enviados` (fecha, descripcion,correo_id, publicacion_id, usuario_fb_id) VALUES (?,?,?,?,?)",
                            [fechaAct, usuario.nombre+' gano '+producto.nombre,email.id, email.publicacion_id, usuario.id],function(err,rows){
                                if(err){
                                    console.log('error '+err);
                                }
                            });
                    }else if(email.id = 3){
                        db.query("INSERT INTO `correos_enviados` (fecha, descripcion,correo_id, usuario_fb_id) VALUES (?,?,?,?)",
                            [fechaAct, usuario.id_fb+'-'+usuario.nombre_fb,email.id,usuario.id],function(err,rows){
                                if(err){
                                    console.log('error '+err);
                                }
                            });
                    }else{
                        db.query("INSERT INTO `correos_enviados` (fecha, descripcion,correo_id) VALUES (?,?,?)",
                            [fechaAct, usuario.id+'-'+usuario.nombre,email.id],function(err,rows){
                                if(err){
                                    console.log('error '+err);
                                }
                            });
                    }
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