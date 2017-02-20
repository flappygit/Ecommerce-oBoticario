var db=require('../dbconnection'); //reference of dbconnection.js

var user={


    getAll:function(callback){

        return db.query("SELECT * FROM usuarios_fb",callback);

    },
    validUser:function(user,callback){
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

        return db.query("INSERT INTO `usuarios_fb`(`id`, `id_fb`, `nombre_fb`, `correo_fb`, `location_fb`, `creacion`) VALUES (null,?,?,?,?,?)",[user.id,user.name,user.email,user.location,today],callback);
        db.end();
    },
    getById:function(id,callback){
        return db.query("SELECT * FROM usuarios_fb WHERE id=?",[id],callback);
        db.end();
    },

    importarNl:function(usuario, callback){
        return db.query("UPDATE usuarios_fb SET nombre = ?, correo = ? WHERE id = ?", [usuario.nombre, usuario.correo, usuario.id],callback);
    },

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