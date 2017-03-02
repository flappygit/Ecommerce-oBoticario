var mysql=require('mysql');
var connection=mysql.createPool({
    host:'localhost',
    user:'nabica',
    password:'',
    database:'nabica_boticario_ecommerce'
});
 /* var connection=mysql.createPool({
    host:'localhost',
    user:'admin_boti20',
    password:'Uyoj08*8',
    database:'boti20_ecommerce'
});*/
module.exports=connection;
