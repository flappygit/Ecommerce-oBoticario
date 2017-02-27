'use strict';
var express = require('express');
var router = express.Router();
var correos=require('../models/correos');
var correosEnviados=require('../models/correosEnviados');
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var utiles = require('../libs/utiles');


Object.prototype.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

/* GET users listing. */
router.get('/', function(req, res, next) {
    correosEnviados.getAll(function (err, rows) {
        res.json(rows);
    });
});
/*
 * post usuario {para*, asunto*, mensaje, cabeceras, descripcion}
 */
router.post('/add',function(req,res,next){
    correosEnviados.add(req.body,function(err,rows){
        if(err)
        {
            console.log(err);
            res.json({"success":false,"message":err});
        }
        else{

            res.json({"success":true,"message":rows});

        }
    });

});
/*
 * id del correo
 */
router.get('/get/:id',function(req,res,next){
    correosEnviados.findById(req.params.id,function(err,rows){
        if(err)
        {
            console.log(err);
            res.json({"success":false,"message":err});
        }
        else{
            var rowStringyfy=JSON.stringify(rows);
            var rows1=JSON.parse(rowStringyfy);
            var size= Object.size(rows1);
            if(size==0 || size==null ){
                res.json({"success":true,"code":0})
            }else{
                res.json({"success":true,"code":1, 'rows':rows})
            }
        }
    });

});
router.get("/sendemail", function(req, res){

    var email = 'clesmesc@gmail.com';
    if( /(.+)@(.+){2,}\.(.+){2,}/.test(email) ){

        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'boticarioecommerce@gmail.com',
                pass: 'boti12ecommerce34'
            }
        });
        var mailOptions = {
            from: 'Boticario',
            to: 'clesmesc@gmail.com',
            subject: 'Asunto',
            text: 'Contenido del email'
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error){
                console.log(error);
                res.status(500).send(error.message);
            } else {
                console.log("Email sent");
                res.status(200).jsonp(info.body);
            }
        });

    } else {
        res.send("El email no se valido Volver")
    }

});
router.get("/enviarcorreo", function(req, res){

    correos.findById(1, function(err, row){
        if (err) {
            console.log(err);
            res.json({"success":false,"message":err});
        }
        else{
            var email =  JSON.parse(JSON.stringify(row))[0];
            if (email) {
                console.log(email);
                if( /(.+)@(.+){2,}\.(.+){2,}/.test(/*req.body.to*/'clesmesc@gmail.com') ){
                    // Vamos criar a conta que irá mandar os e-mails
                    var conta = nodemailer.createTransport({
                        service: 'Gmail', // Existem outros services, você pode procurar
                                          // na documentação do nodemailer como utilizar
                                          // os outros serviços
                        auth: {
                            user: 'boticarioecommerce@gmail.com', // Seu usuário no Gmail
                            pass: 'boti12ecommerce34' // A senha da sua conta no Gmail :-)
                        }
                    });
                    console.log(conta);
                    conta.sendMail({
                        from: email.para, // NOTA: Para es quien lo envia XD
                        to: 'clesmesc@gmail.com',//req.body.nombre+' <'+ req.body.to +'>', // Para quem o e-mail deve chegar
                        subject: email.asunto, // O assunto
                        html: email.mensaje, // O HTMl do nosso e-mail
                    }, function(err){
                        if(err){
                            res.send("Error enviando el correo");
                            console.log(err);
                        }else {
                            console.send('E-mail enviado!');
                        }

                    });
                } else {
                    res.send("El email no se valido Volver")
                }
            }else{
                console.log('Correo no encontrado');
            }
        }
    });

    //
    res.send('terminó');

});

module.exports = router;
