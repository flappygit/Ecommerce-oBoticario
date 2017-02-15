var db=require('../dbconnection'); //reference of dbconnection.js
 
var user={
 
getAll:function(callback){
 
return db.query("SELECT * FROM user _facebook",callback);
 
},
validUser:function(user,callback){
	return db.query("SELECT * FROM user_facebook WHERE id_facebook=?",[user.id],callback);
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

 return db.query("INSERT INTO `user_facebook`(`id_user`, `id_facebook`, `name`, `email`, `location`, `date_create`) VALUES (null,?,?,?,?,?)",[user.id,user.name,user.email,user.location,today],callback);
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