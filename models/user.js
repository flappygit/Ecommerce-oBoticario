var db=require('../dbconnection'); //reference of dbconnection.js
 
var user={
 
getAll:function(callback){
 
return db.query("SELECT * FROM usuarios_fb",callback);
 
},
validUser:function(user,callback){
	console.log(user);
	return db.query("SELECT * FROM usuarios_fb WHERE id_fb=?",[user.id],callback);
	db.end();
 },
   
addUser:function(user,callback){
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

today =yyyy+'-'+mm+'-'+dd;
 return db.query("INSERT INTO `usuarios_fb`(`id`, `id_fb`, `nombre_fb`, `creacion`, `correo_fb`, `location_fb`, correo) VALUES (null,?,?,?,?,?,null)",[user.id,user.name,today,user.email,user.location],callback);
	db.end();
 
 }

 /*,
 deleteTask:function(id,callback){
  return db.query("delete from task where Id=?",[id],callback);
 },
 updateTask:function(id,user,callback){
  return db.query("update task set Title=?,Status=? where Id=?",[user.Title,user.Status,id],callback);
 }
  */ 
};
 module.exports=user;