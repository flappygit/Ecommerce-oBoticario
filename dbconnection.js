var mysql=require('mysql');
var connection=mysql.createPool({ 
host:'localhost',
 user:'root',
 password:'',
 database:'ecommerce_boticario'
 
});
 module.exports=connection;
