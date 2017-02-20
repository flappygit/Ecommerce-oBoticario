var mysql=require('mysql');
var connection=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'nabica_boticario_ecommerce'

});
module.exports=connection;
