'use strict';
var express = require('express');
var router = express.Router();
var correos=require('../models/correos');
var correosEnviados=require('../models/correosEnviados');
var usuariosNl=require('../models/usuarios_nl');
const nodemailer = require('nodemailer');
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
/**
 * req {correo:'id del correo a enviar', to:'correo del destinatario', clave:'clave para la transaccion'}
 */
router.get("/prueba", function(req, res){

        correos.findById(1, function (err, row) {
            if (err) {
                console.log(err);
                res.json({"success": false, "message": err});
            }
            else {
                var email = JSON.parse(JSON.stringify(row))[0];
                if (email) {

                    var mensaje = mensajePrueba('Christian rpeuba', '5asd1f65sdf56asd1fas56d1f6sad5f');
                    correosEnviados.enviarcorreo(email, {correo:'clesmesc@gmail.com', id:1, nombre:'Christian Lesmes'}, null, {mensaje:mensaje}, function(err,info){
                        if(err)
                        {
                            res.json({"success":false,"message":err});
                        }
                        else {
                            if (info.success){
                                res.json({"success":true});
                            }else{
                                res.json({"success": false, "code": 2, "message": info});
                            }
                        }
                    })
                } else {
                    res.json({"success": false, "code": 2, "message": "Correo no encontrado"});
                }
            }
        });


    function mensajePrueba(nombre, codigo){
        return '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> <html xmlns="http://www.w3.org/1999/xhtml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> <meta name="viewport" content="initial-scale=1.0"/> <meta name="format-detection" content="telephone=no"/> <title>oBoticário - Cree en la belleza</title> <style type="text/css">/* Resets: see reset.css for details */.ReadMsgBody { width: 100%; background-color: #ffffff;}.ExternalClass {width: 100%; background-color: #ffffff;}.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height:100%;}html{width: 100%; }body {-webkit-text-size-adjust:none; -ms-text-size-adjust:none; }body {margin:0; padding:0;}table {border-spacing:0;}img{display:block !important;}table td {border-collapse:collapse;}.yshortcuts a {border-bottom: none !important;}/* main color = #26acdcbackground color1 = #f5f5f5background color2 = #eeeeef*/img{height:auto !important;}@media only screen and (max-width: 900px){body{width:auto!important;}table[class="container"]{width: 100%!important;padding-left: 20px!important;padding-right: 20px!important;}img[class="image-100-percent"]{width:100% !important;height:auto !important;max-width:100% !important;}img[class="small-image-100-percent"]{width:100% !important;height:auto !important;}table[class="full-width"]{width:100% !important;}table[class="full-width-text"]{width:100% !important;background-color:#E12004;padding-left:20px !important;padding-right:20px !important;}table[class="full-width-text2"]{width:100% !important;background-color:#f3f3f3;padding-left:20px !important;padding-right:20px !important;}table[class="col-2-3img"]{width:50% !important;margin-right: 20px !important;}table[class="col-2-3img-last"]{width:50% !important;}table[class="col-2"]{width:47% !important;margin-right:20px !important;}table[class="col-2-last"]{width:47% !important;}table[class="col-3"]{width:29% !important;margin-right:20px !important;}table[class="col-3-last"]{width:29% !important;}table[class="row-2"]{width:50% !important;}td[class="text-center"]{text-align: center !important;}/* start clear and remove*/table[class="remove"]{display:none !important;}td[class="remove"]{display:none !important;}/* end clear and remove*/table[class="fix-box"]{padding-left:20px !important;padding-right:20px !important;}td[class="fix-box"]{padding-left:20px !important;padding-right:20px !important;}td[class="font-resize"]{font-size: 18px !important;line-height: 22px !important;}}@media only screen and (max-width: 479px){body{font-size:10px !important;}table[class="container"]{width: 100%!important;padding-left: 10px!important;padding-right:10px!important;}table[class="container2"]{width: 100%!important;float:none !important;}img[class="image-100-percent"]{width:100% !important;height:auto !important;max-width:100% !important;min-width:124px !important;}img[class="small-image-100-percent"]{width:100% !important;height:auto !important;max-width:100% !important;min-width:124px !important;}table[class="full-width"]{width:100% !important;}table[class="full-width-text"]{width:100% !important;background-color:#E12004;padding-left:20px !important;padding-right:20px !important;}table[class="full-width-text2"]{width:100% !important;background-color:#f3f3f3;padding-left:20px !important;padding-right:20px !important;}table[class="col-2"]{width:100% !important;margin-right:0px !important;}table[class="col-2-last"]{width:100% !important;}table[class="col-3"]{width:100% !important;margin-right:0px !important;}table[class="col-3-last"]{width:100% !important;}table[class="row-2"]{width:100% !important;}table[id="col-underline"]{float: none !important;width: 100% !important;border-bottom: 1px solid #eee;}td[id="col-underline"]{float: none !important;width: 100% !important;border-bottom: 1px solid #eee;}td[class="col-underline"]{float: none !important;width: 100% !important;border-bottom: 1px solid #eee;}/*start text center*/td[class="text-center"]{text-align: center !important;}div[class="text-center"]{text-align: center !important;}/*end text center*//* start  clear and remove */table[id="clear-padding"]{padding:0 !important;}td[id="clear-padding"]{padding:0 !important;}td[class="clear-padding"]{padding:0 !important;}table[class="remove-479"]{display:none !important;}td[class="remove-479"]{display:none !important;}table[class="clear-align"]{float:none !important;}/* end  clear and remove */table[class="width-small"]{width:100% !important;}table[class="fix-box"]{padding-left:0px !important;padding-right:0px !important;}td[class="fix-box"]{padding-left:0px !important;padding-right:0px !important;}td[class="font-resize"]{font-size: 14px !important;}td[class="increase-Height"]{height:10px !important;}td[class="increase-Height-20"]{height:20px !important;}}@media only screen and (max-width: 320px){table[class="width-small"]{width:125px !important;}img[class="image-100-percent"]{width:100% !important;height:auto !important;max-width:100% !important;min-width:124px !important;}}</style> </head> <body  style="font-size:12px;"> <table id="mainStructure" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#000000;"> <!--START ICON SOCAIL --> <tr> <td align="center" valign="top" style="background-color: rgb(226, 37, 3);"> <!-- start container 600 --> <table width="600" align="center" border="0" cellspacing="0" cellpadding="0" class="container" bgcolor="#26acdc" style="background-color: rgb(226, 37, 3);"> <tr> <td valign="top"> <table width="560" align="center" border="0" cellspacing="0" cellpadding="0" class="full-width" bgcolor="#26acdc" style="background-color: #E33A26;"> <!-- start space --> <tr> <td valign="top"> <!-- start container --> <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0"> <tr> <td valign="top"> <!-- start view online --> <table align="center" border="0" cellspacing="0" cellpadding="0" class="container2"> <tr> <td> <table align="center" border="0" cellspacing="0" cellpadding="0"> <tr> <td style="font-size: 11px; line-height: 27px; font-family: Arial,Tahoma, Helvetica, sans-serif; color:#ffffff; font-weight:normal; text-align:center;"> <span style="text-decoration: none; color: #ffffff;"><a href="#" style="text-decoration: none; color: rgb(255, 255, 255);">Si tienes problemas visualizando este correo, <strong>haz clic aquí</strong></a></span> </td> </tr> </table> </td> </tr> <!-- start space --> <tr> <td valign="top" class="increase-Height"> </td> </tr> <!-- end space --> </table> <!-- end view online --</td> </tr> </table> <!-- end container  --> </td> </tr<!-- start space --> <tr> <td valign="top" class="increase-Height"> </td> </tr> <!-- end space --> </table> <!-- end container 600--> </td> </tr> </table> </td> </tr> <!--END ICON SOCAIL--<!--START TOP NAVIGATION ​LAYOUT--> <tr> <td valign="top"> <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" style="background-color:#fff;"> <!-- START CONTAINER NAVIGATION --> <tr> <td align="center" valign="top" class="fix-box"> <!-- start top navigaton --> <table width="560" align="center" border="0" cellspacing="0" cellpadding="0" class="full-width"> <tr> <tr> <td valign="middle"> <table align="left" border="0" cellspacing="0" cellpadding="0" class="container2"> <tr> <td align="center" valign="top"> <a href="#" style="text-decoration: none;"><img src="images/logo-boticario.jpg" width="247" style="max-width:160px;" alt="Logo" border="0" hspace="0" vspace="0"></a> </td> </tr> </table> <!--start content nav --> <table border="0" align="right" cellpadding="0" cellspacing="0" class="container2"> <!--start call us --> <tr> <td height="83" align="center" valign="middle"> <table align="right" border="0" cellpadding="0" cellspacing="0" class="clear-align" style="height:100%;"> <tr> <td align="center" valign="middle" id="clear-padding"> <a href="https://www.facebook.com/OBoticarioColombia/?fref=ts" style="text-decoration: none;"><img src="images/facebook.png" width="70" alt="icon-facebook" style="max-width:30px;" border="0" hspace="0" vspace="0"></a> </td> <td align="center" valign="middle" id="clear-padding"> <a href="https://www.instagram.com/oboticariocol/" style="text-decoration: none;"><img src="images/instagram.png" width="70" alt="icon-instagram" style="max-width:30px;" border="0" hspace="0" vspace="0"></a> </td> </table> </td> </tr> <!--end call us --> </table> <!--end content nav --> </td> </tr> <!-- start space --> <tr> <td valign="top" height="3"> </td> </tr> <!-- end space --> </table> <!-- end top navigaton --> </td> </tr> </table> <!-- end top navigation container --> </td> </tr> <!-- END CONTAINER NAVIGATION --> </table> </td> </tr> <!--END TOP NAVIGATION ​LAYOUT--> <!--START IMAGE HEADER LAYOUT--> <tr> <td valign="top"> <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" class="full-width" style="background-color:#fff;"> <tr> <td class="full-width" width="100%" align="center" valign="top"> <!-- start header container --> <table width="600" align="center" border="0" cellspacing="0" cellpadding="0" class="full-width" style="background-color:#fff; "> <tr> <td valign="top" align="center"> <a href="#" style="text-decoration: none;"> <img class="image-100-percent" src="images/banner-principal-nativa.jpg" width="600" alt="image9_600x290" style="max-width:600px display:block; " border="0" hspace="0" vspace="0"> </a> </td> </tr> </table> <!-- end header container --> </td> </tr> </table> </td> </tr> <!--END IMAGE HEADER LAYOUT--> <!-- START LAYOUT 1 --> <tr> <td align="center" valign="top" style="background-color: #fff; "> <!-- start layout-1 container width 600px --> <table width="600" align="center" border="0" cellspacing="0" cellpadding="0" class="container" bgcolor="#fff" style="background-color: #fff;"> <tr> <td valign="top"> <!-- start layout-1 container width 560px --> <table width="560" align="center" border="0" cellspacing="0" cellpadding="0" class="full-width" bgcolor="#fff" style="background-color:#fff;"> <!--start space height --> <tr> <td height="20"></td> </tr> <!--end space height --> <!-- start text content --> <!-- <tr> <td valign="top"> <table border="0" cellspacing="0" cellpadding="0" align="left"> <tr> <td style="font-size: 18px; line-height: 22px; font-family: Arial,Tahoma, Helvetica, sans-serif; color:#000; font-weight:bold; text-align:left;"><span style="color: #000">¡Bienvenida Andrea! </span></td> </tr> --> <!--start space height --> <tr> <td height="1"></td> </tr> <!--end space height --> <tr> <td style="font-size: 13px; line-height: 22px; font-family:Arial,Tahoma, Helvetica, sans-serif; color:#000; font-weight:normal; text-align:center; "> <p>Hola “'+nombre+'”, gracias por suscribirte y ser parte de esta experiencia llena de magia que queremos ofrecerte desde oBoticário. <br /> <br />¡Has ganado tus primeros 40 likes! <bR> Para redimir tus likes puedes ingresar tu código de inscripción: </p></td> </tr> <tr> <td style="font-size: 30px; line-height: 22px; font-family:Arial,Tahoma, Helvetica, sans-serif; color:#AAA; font-weight:normal; text-align:center; "> <p> '+ codigo +' <tr> <td style="font-size: 13px; line-height: 22px; font-family:Arial,Tahoma, Helvetica, sans-serif; color:#000; font-weight:normal; text-align:center; "> <p>Canjéalo al momento de tu compra en nuestro e-commerce en donde pagas con likes. </p></td> </tr> <!--start space height --> <tr> <td height="30"></td> </tr> <!--end space height --> <tr> <td valign="top" width="auto" align="center"> <!-- start button --> <table border="0" align="center" cellpadding="0" cellspacing="0"> <tr> <td> <table border="0" align="center" cellpadding="0" cellspacing="0"> <tr> <td width="180" align="center" valign="middle" height="55" style="background-color: #E33A26; border-top-left-radius: 30px; border-top-right-radius: 30px; border-bottom-right-radius: 30px; border-bottom-left-radius: 30px; background-clip: padding-box; font-size: 16px; font-family: Arial, Tahoma, Helvetica, sans-serif; text-align: center; color: rgb(255, 255, 255); font-weight: normal; padding-left: 18px; padding-right: 18px;"> <span style="color: #ffffff; font-weight: normal;"> <a href="http://www.creeenlabelleza.com" style="text-decoration: none; color: rgb(255, 255, 255); font-weight: normal;"> Ir al e-commerce </a> </span> </td> </tr> </table> </td> <td> <table border="0" align="center" cellpadding="0" cellspacing="0"> </table> </td> </tr> </table> <!-- end button --> </td> </tr> </table> </td> </tr> <!-- end text content --> <!--start space height --> <tr> <td height="40"></td> </tr> <!--end space height --> </table> <!-- end layout-1 container width 560px --> </td> </tr> </table> <!-- end layout-1 container width 600px --> </td> </tr> <tr> <td valign="top"> <table width="600" align="center" border="0" cellspacing="0" cellpadding="0" class="container" style="background-color: #E33A26;"> <tr> <!-- start COPY RIGHT content --> <td valign="top" style="font-size: 14px; line-height: 12px; font-family: Arial,Tahoma, Helvetica, sans-serif; color:#ffffff; font-weight:normal; text-align:center; "> <p>&nbsp;</p> <p>Todos los derechos reservados  l  www.creeenlabelleza.com</p> <p>&nbsp;</p> <!-- end COPY RIGHT content --> </tr> </table> </td> </tr> </table> </td> </tr> <!--  END FOOTER COPY RIGHT --> </table></body> </html>';
    }
});

/**
 * req {correo:'id del correo a enviar', to:'correo del destinatario', clave:'clave para la transaccion'}
 */
router.post("/enviarcorreo", function(req, res){

    console.log(req.body);
    if (req.body.clave = '400226926995567') {
        correos.findById(req.body.correo, function (err, row) {
            if (err) {
                console.log(err);
                res.json({"success": false, "message": err});
            }
            else {
                var email = JSON.parse(JSON.stringify(row))[0];
                if (email) {
                    correosEnviados.enviarcorreo(email, req.body.usuario, null, null, function(err,info){
                        if(err)
                        {
                            res.json({"success":false,"message":err});
                        }
                        else {
                            if (info.success){
                                res.json({"success":true});
                            }else{
                                res.json({"success": false, "code": 2, "message": info});
                            }
                        }
                    })
                } else {
                    res.json({"success": false, "code": 2, "message": "Correo no encontrado"});
                }
            }
        });
    }

});


router.post("/enviarcorreonl", function(req, res){

    if (req.body.clave = '400226926995567') {
        correos.findById(req.body.correo, function (err, row) {
            if (err) {
                console.log(err);
                res.json({"success": false, "message": err});
            }
            else {
                usuariosNl.findById(req.body.nl, function (err, nl) {
                    if (err){
                        res.json({"success": false, "message": "usuario nl no encontrado"});
                    }else {
                        var usuNl = JSON.parse(JSON.stringify(nl))[0];
                        var email = JSON.parse(JSON.stringify(row))[0];
                        if (email) {
                            var mensaje = mensajenl(usuNl.nombre, usuNl.codigo);
                            correosEnviados.enviarcorreo(email, usuNl, null, {mensaje:mensaje}, function (err, info) {
                                if (err) {
                                    res.json({"success": false, "message": err});
                                }
                                else {
                                    if (info.success) {
                                        res.json({"success": true});
                                    } else {
                                        res.json({"success": false, "code": 2, "message": info});
                                    }
                                }
                            })
                        } else {
                            res.json({"success": false, "code": 2, "message": "Correo no encontrado"});
                        }
                    }
                });

            }
        });
    }

    function mensajenl(nombre, codigo){
        return '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> <html xmlns="http://www.w3.org/1999/xhtml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> <meta name="viewport" content="initial-scale=1.0"/> <meta name="format-detection" content="telephone=no"/> <title>oBoticário - Cree en la belleza</title> <style type="text/css">/* Resets: see reset.css for details */.ReadMsgBody { width: 100%; background-color: #ffffff;}.ExternalClass {width: 100%; background-color: #ffffff;}.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height:100%;}html{width: 100%; }body {-webkit-text-size-adjust:none; -ms-text-size-adjust:none; }body {margin:0; padding:0;}table {border-spacing:0;}img{display:block !important;}table td {border-collapse:collapse;}.yshortcuts a {border-bottom: none !important;}/* main color = #26acdcbackground color1 = #f5f5f5background color2 = #eeeeef*/img{height:auto !important;}@media only screen and (max-width: 900px){body{width:auto!important;}table[class="container"]{width: 100%!important;padding-left: 20px!important;padding-right: 20px!important;}img[class="image-100-percent"]{width:100% !important;height:auto !important;max-width:100% !important;}img[class="small-image-100-percent"]{width:100% !important;height:auto !important;}table[class="full-width"]{width:100% !important;}table[class="full-width-text"]{width:100% !important;background-color:#E12004;padding-left:20px !important;padding-right:20px !important;}table[class="full-width-text2"]{width:100% !important;background-color:#f3f3f3;padding-left:20px !important;padding-right:20px !important;}table[class="col-2-3img"]{width:50% !important;margin-right: 20px !important;}table[class="col-2-3img-last"]{width:50% !important;}table[class="col-2"]{width:47% !important;margin-right:20px !important;}table[class="col-2-last"]{width:47% !important;}table[class="col-3"]{width:29% !important;margin-right:20px !important;}table[class="col-3-last"]{width:29% !important;}table[class="row-2"]{width:50% !important;}td[class="text-center"]{text-align: center !important;}/* start clear and remove*/table[class="remove"]{display:none !important;}td[class="remove"]{display:none !important;}/* end clear and remove*/table[class="fix-box"]{padding-left:20px !important;padding-right:20px !important;}td[class="fix-box"]{padding-left:20px !important;padding-right:20px !important;}td[class="font-resize"]{font-size: 18px !important;line-height: 22px !important;}}@media only screen and (max-width: 479px){body{font-size:10px !important;}table[class="container"]{width: 100%!important;padding-left: 10px!important;padding-right:10px!important;}table[class="container2"]{width: 100%!important;float:none !important;}img[class="image-100-percent"]{width:100% !important;height:auto !important;max-width:100% !important;min-width:124px !important;}img[class="small-image-100-percent"]{width:100% !important;height:auto !important;max-width:100% !important;min-width:124px !important;}table[class="full-width"]{width:100% !important;}table[class="full-width-text"]{width:100% !important;background-color:#E12004;padding-left:20px !important;padding-right:20px !important;}table[class="full-width-text2"]{width:100% !important;background-color:#f3f3f3;padding-left:20px !important;padding-right:20px !important;}table[class="col-2"]{width:100% !important;margin-right:0px !important;}table[class="col-2-last"]{width:100% !important;}table[class="col-3"]{width:100% !important;margin-right:0px !important;}table[class="col-3-last"]{width:100% !important;}table[class="row-2"]{width:100% !important;}table[id="col-underline"]{float: none !important;width: 100% !important;border-bottom: 1px solid #eee;}td[id="col-underline"]{float: none !important;width: 100% !important;border-bottom: 1px solid #eee;}td[class="col-underline"]{float: none !important;width: 100% !important;border-bottom: 1px solid #eee;}/*start text center*/td[class="text-center"]{text-align: center !important;}div[class="text-center"]{text-align: center !important;}/*end text center*//* start  clear and remove */table[id="clear-padding"]{padding:0 !important;}td[id="clear-padding"]{padding:0 !important;}td[class="clear-padding"]{padding:0 !important;}table[class="remove-479"]{display:none !important;}td[class="remove-479"]{display:none !important;}table[class="clear-align"]{float:none !important;}/* end  clear and remove */table[class="width-small"]{width:100% !important;}table[class="fix-box"]{padding-left:0px !important;padding-right:0px !important;}td[class="fix-box"]{padding-left:0px !important;padding-right:0px !important;}td[class="font-resize"]{font-size: 14px !important;}td[class="increase-Height"]{height:10px !important;}td[class="increase-Height-20"]{height:20px !important;}}@media only screen and (max-width: 320px){table[class="width-small"]{width:125px !important;}img[class="image-100-percent"]{width:100% !important;height:auto !important;max-width:100% !important;min-width:124px !important;}}</style> </head> <body  style="font-size:12px;"> <table id="mainStructure" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#000000;"> <!--START ICON SOCAIL --> <tr> <td align="center" valign="top" style="background-color: rgb(226, 37, 3);"> <!-- start container 600 --> <table width="600" align="center" border="0" cellspacing="0" cellpadding="0" class="container" bgcolor="#26acdc" style="background-color: rgb(226, 37, 3);"> <tr> <td valign="top"> <table width="560" align="center" border="0" cellspacing="0" cellpadding="0" class="full-width" bgcolor="#26acdc" style="background-color: #E33A26;"> <!-- start space --> <tr> <td valign="top"> <!-- start container --> <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0"> <tr> <td valign="top"> <!-- start view online --> <table align="center" border="0" cellspacing="0" cellpadding="0" class="container2"> <tr> <td> <table align="center" border="0" cellspacing="0" cellpadding="0"> <tr> <td style="font-size: 11px; line-height: 27px; font-family: Arial,Tahoma, Helvetica, sans-serif; color:#ffffff; font-weight:normal; text-align:center;"> <span style="text-decoration: none; color: #ffffff;"><a href="#" style="text-decoration: none; color: rgb(255, 255, 255);">Si tienes problemas visualizando este correo, <strong>haz clic aquí</strong></a></span> </td> </tr> </table> </td> </tr> <!-- start space --> <tr> <td valign="top" class="increase-Height"> </td> </tr> <!-- end space --> </table> <!-- end view online --</td> </tr> </table> <!-- end container  --> </td> </tr<!-- start space --> <tr> <td valign="top" class="increase-Height"> </td> </tr> <!-- end space --> </table> <!-- end container 600--> </td> </tr> </table> </td> </tr> <!--END ICON SOCAIL--<!--START TOP NAVIGATION ​LAYOUT--> <tr> <td valign="top"> <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" style="background-color:#fff;"> <!-- START CONTAINER NAVIGATION --> <tr> <td align="center" valign="top" class="fix-box"> <!-- start top navigaton --> <table width="560" align="center" border="0" cellspacing="0" cellpadding="0" class="full-width"> <tr> <tr> <td valign="middle"> <table align="left" border="0" cellspacing="0" cellpadding="0" class="container2"> <tr> <td align="center" valign="top"> <a href="#" style="text-decoration: none;"><img src="images/logo-boticario.jpg" width="247" style="max-width:160px;" alt="Logo" border="0" hspace="0" vspace="0"></a> </td> </tr> </table> <!--start content nav --> <table border="0" align="right" cellpadding="0" cellspacing="0" class="container2"> <!--start call us --> <tr> <td height="83" align="center" valign="middle"> <table align="right" border="0" cellpadding="0" cellspacing="0" class="clear-align" style="height:100%;"> <tr> <td align="center" valign="middle" id="clear-padding"> <a href="https://www.facebook.com/OBoticarioColombia/?fref=ts" style="text-decoration: none;"><img src="images/facebook.png" width="70" alt="icon-facebook" style="max-width:30px;" border="0" hspace="0" vspace="0"></a> </td> <td align="center" valign="middle" id="clear-padding"> <a href="https://www.instagram.com/oboticariocol/" style="text-decoration: none;"><img src="images/instagram.png" width="70" alt="icon-instagram" style="max-width:30px;" border="0" hspace="0" vspace="0"></a> </td> </table> </td> </tr> <!--end call us --> </table> <!--end content nav --> </td> </tr> <!-- start space --> <tr> <td valign="top" height="3"> </td> </tr> <!-- end space --> </table> <!-- end top navigaton --> </td> </tr> </table> <!-- end top navigation container --> </td> </tr> <!-- END CONTAINER NAVIGATION --> </table> </td> </tr> <!--END TOP NAVIGATION ​LAYOUT--> <!--START IMAGE HEADER LAYOUT--> <tr> <td valign="top"> <table width="100%" align="center" border="0" cellspacing="0" cellpadding="0" class="full-width" style="background-color:#fff;"> <tr> <td class="full-width" width="100%" align="center" valign="top"> <!-- start header container --> <table width="600" align="center" border="0" cellspacing="0" cellpadding="0" class="full-width" style="background-color:#fff; "> <tr> <td valign="top" align="center"> <a href="#" style="text-decoration: none;"> <img class="image-100-percent" src="images/banner-principal-nativa.jpg" width="600" alt="image9_600x290" style="max-width:600px display:block; " border="0" hspace="0" vspace="0"> </a> </td> </tr> </table> <!-- end header container --> </td> </tr> </table> </td> </tr> <!--END IMAGE HEADER LAYOUT--> <!-- START LAYOUT 1 --> <tr> <td align="center" valign="top" style="background-color: #fff; "> <!-- start layout-1 container width 600px --> <table width="600" align="center" border="0" cellspacing="0" cellpadding="0" class="container" bgcolor="#fff" style="background-color: #fff;"> <tr> <td valign="top"> <!-- start layout-1 container width 560px --> <table width="560" align="center" border="0" cellspacing="0" cellpadding="0" class="full-width" bgcolor="#fff" style="background-color:#fff;"> <!--start space height --> <tr> <td height="20"></td> </tr> <!--end space height --> <!-- start text content --> <!-- <tr> <td valign="top"> <table border="0" cellspacing="0" cellpadding="0" align="left"> <tr> <td style="font-size: 18px; line-height: 22px; font-family: Arial,Tahoma, Helvetica, sans-serif; color:#000; font-weight:bold; text-align:left;"><span style="color: #000">¡Bienvenida Andrea! </span></td> </tr> --> <!--start space height --> <tr> <td height="1"></td> </tr> <!--end space height --> <tr> <td style="font-size: 13px; line-height: 22px; font-family:Arial,Tahoma, Helvetica, sans-serif; color:#000; font-weight:normal; text-align:center; "> <p>Hola “'+nombre+'”, gracias por suscribirte y ser parte de esta experiencia llena de magia que queremos ofrecerte desde oBoticário. <br /> <br />¡Has ganado tus primeros 40 likes! <bR> Para redimir tus likes puedes ingresar tu código de inscripción: </p></td> </tr> <tr> <td style="font-size: 30px; line-height: 22px; font-family:Arial,Tahoma, Helvetica, sans-serif; color:#AAA; font-weight:normal; text-align:center; "> <p> '+ codigo +' <tr> <td style="font-size: 13px; line-height: 22px; font-family:Arial,Tahoma, Helvetica, sans-serif; color:#000; font-weight:normal; text-align:center; "> <p>Canjéalo al momento de tu compra en nuestro e-commerce en donde pagas con likes. </p></td> </tr> <!--start space height --> <tr> <td height="30"></td> </tr> <!--end space height --> <tr> <td valign="top" width="auto" align="center"> <!-- start button --> <table border="0" align="center" cellpadding="0" cellspacing="0"> <tr> <td> <table border="0" align="center" cellpadding="0" cellspacing="0"> <tr> <td width="180" align="center" valign="middle" height="55" style="background-color: #E33A26; border-top-left-radius: 30px; border-top-right-radius: 30px; border-bottom-right-radius: 30px; border-bottom-left-radius: 30px; background-clip: padding-box; font-size: 16px; font-family: Arial, Tahoma, Helvetica, sans-serif; text-align: center; color: rgb(255, 255, 255); font-weight: normal; padding-left: 18px; padding-right: 18px;"> <span style="color: #ffffff; font-weight: normal;"> <a href="http://www.creeenlabelleza.com" style="text-decoration: none; color: rgb(255, 255, 255); font-weight: normal;"> Ir al e-commerce </a> </span> </td> </tr> </table> </td> <td> <table border="0" align="center" cellpadding="0" cellspacing="0"> </table> </td> </tr> </table> <!-- end button --> </td> </tr> </table> </td> </tr> <!-- end text content --> <!--start space height --> <tr> <td height="40"></td> </tr> <!--end space height --> </table> <!-- end layout-1 container width 560px --> </td> </tr> </table> <!-- end layout-1 container width 600px --> </td> </tr> <tr> <td valign="top"> <table width="600" align="center" border="0" cellspacing="0" cellpadding="0" class="container" style="background-color: #E33A26;"> <tr> <!-- start COPY RIGHT content --> <td valign="top" style="font-size: 14px; line-height: 12px; font-family: Arial,Tahoma, Helvetica, sans-serif; color:#ffffff; font-weight:normal; text-align:center; "> <p>&nbsp;</p> <p>Todos los derechos reservados  l  www.creeenlabelleza.com</p> <p>&nbsp;</p> <!-- end COPY RIGHT content --> </tr> </table> </td> </tr> </table> </td> </tr> <!--  END FOOTER COPY RIGHT --> </table></body> </html>';
    }

});


router.post("/enviarcorreofb", function(req, res){

    if (req.body.clave = '400226926995567') {
        correos.findById(req.body.correo, function (err, row) {
            if (err) {
                console.log(err);
                res.json({"success": false, "message": err});
            }
            else {
                var email = JSON.parse(JSON.stringify(row))[0];
                if (email) {
                    var mensaje = 'Hola <b>'+req.body.nombre+'</b>, Gracias por registrarte con facebook, bla bla bla';
                    correosEnviados.enviarcorreo(email, req.body.usuario, null, {mensaje:mensaje}, function (err, info) {
                        if (err) {
                            res.json({"success": false, "message": err});
                        }
                        else {
                            if (info.success) {
                                res.json({"success": true});
                            } else {
                                res.json({"success": false, "code": 2, "message": info});
                            }
                        }
                    })
                } else {
                    res.json({"success": false, "code": 2, "message": "Correo no encontrado"});
                }

            }
        });
    }

});

module.exports = router;
