var mysql=require('mysql');
var connection=mysql.createPool({
    host:'https://creeenlabelleza.com:3306',
    user:'admin_boti20',
    password:'Uyoj08*8',
    database:'boti20_ecommerce'

});
module.exports=connection;
