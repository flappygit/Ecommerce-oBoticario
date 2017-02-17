var mysql=require('mysql');
var connection=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'ecommerce_boticario'

});
module.exports=connection;

/*
connection 1
var mysql=require('mysql');
var connection=mysql.createPool({
    host:'localhost',
    user:'nabica',
    password:'',
    database:'nabica_boticario_ecommerce'

});
module.exports=connection;

*/
