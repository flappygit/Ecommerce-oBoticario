var crypto = require('crypto');

var utiles={

    fechaAct:function(){
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

        return yyyy+'-'+mm+'-'+dd;

    },fechaHoraAct:function(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        var h=today.getHours();
        var i=today.getMinutes();
        var s=today.getSeconds()

        if(dd<10) {
            dd='0'+dd
        }

        if(mm<10) {
            mm='0'+mm
        }

        return yyyy+'-'+mm+'-'+dd+' '+h+':'+i+':'+s;

    },
    generarCodigo:function(name){
         return crypto.createHash('md5').update(name).digest('hex');
    }
};
module.exports=utiles;